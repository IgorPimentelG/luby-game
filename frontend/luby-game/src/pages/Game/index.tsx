/* eslint-disable @typescript-eslint/no-empty-function */
import { useContext, useEffect, useState } from "react";
import { BONUS_GAME, INITIAL_LBC, LBC_GAME } from "@constants";
import GameContext from "@context/game-context";
import DataJSON from "@assets/data/questions.json";
import Lottie from "react-lottie";
import { Button, Loading } from "@components/ui";
import { useTheme } from "styled-components";
import { Question } from "@shared/types/game";
import { useNavigate } from "react-router-dom";
import { contract } from "@shared/services/contract";
import { Balance, Header, Modal } from "@components/layout";
import { correctAnimation, errorAnimation } from "@assets/animations";
import {
	ContainerOptions,
	Counter,
	LabelAnswer,
	LabelStatement,
	Option,
	RadioButton,
	RootContainer,
	Title,
	ContainerButtons,
	Space,
	ContainerAnimation,
	Label
} from "./styles";

const GamePage = () => {

	const navigate = useNavigate();
	const theme = useTheme();
	const ctxGame = useContext(GameContext);
	const questions: Question[] = DataJSON.questions;

	const {
		startGame,
		correctAnswer,
		incorrectAnswer,
		claimBalance,
		getBalanceIndividual
	} = contract();

	const [questionNumber, setQuestionNumber] = useState(1);
	const [selectedQuestion, setSelectedQuestion] = useState<Question>(questions[0]);
	const [userAnswer, setUserAnswer] = useState<string>();
	const [animationFeedback, setAnimationFeedback] = useState<any>();
	const [userPoints, setUserPoints] = useState({ correct: 0, incorrect: 0 });
	const [isLoading, setIsLoading] = useState(false);
	const [messageModal, setMessageModal] = useState("");
	const [balancePlayer, setBalancePlayer] = useState(0);

	/**
	 * Verificar se existe um usuário registrado para iniciar o game, caso contrário,
	 * o usuário será redirecionado para a página home.
	 */
	useEffect(() => {
		setIsLoading(true);
		if( !ctxGame.user.walletAddress ) {
			navigate("/home");
		} else {
			startGame(INITIAL_LBC).then(() => {
				setIsLoading(false);
			}).catch((error) => {
				setIsLoading(false);
				setMessageModal(error);
			});
		}
	}, []);

	/**
	 * Quando não existir mais questões disponíveis, o saldo final do game
	 * será obitido para aparesentar ao usuário
	 */
	useEffect(() => {
		const fetchBalancePlayer = async () => {
			setIsLoading(true);
			const balance = await getBalanceIndividual();
			setBalancePlayer(balance);
			setIsLoading(false);
		};

		if( !selectedQuestion ) {
			fetchBalancePlayer();
		}
	}, [selectedQuestion]);

	function nextQuestionHandler() {
		if( userAnswer ) {
			if(questionNumber <= questions.length) {

				verifyAnswer();

				setTimeout(() => {
					setAnimationFeedback(null);
					setSelectedQuestion(questions[questionNumber]);
					setQuestionNumber((currentNumber) => currentNumber + 1);
				}, 3000);
			}
		}
	}

	function changeUserAnswerHandler(event: React.FormEvent) {
		const target = event.target as HTMLInputElement;
		setUserAnswer(target.value);
	}

	function verifyAnswer() {
		if( userAnswer === selectedQuestion.answerKey ) {
			correctAnswer(LBC_GAME).then(() => {
				ctxGame.updateBalance(ctxGame.user.balance + 1);
				setAnimationFeedback(correctAnimation);
				setUserPoints((currentState) => {
					return {
						...currentState,
						correct: currentState.correct + 1,
					};
				});
			});
		} else {
			incorrectAnswer(LBC_GAME).then(() => {
				ctxGame.updateBalance(ctxGame.user.balance - 1);
				setAnimationFeedback(errorAnimation);
				setUserPoints((currentState) => {
					return {
						...currentState,
						incorrect: currentState.incorrect + 1,
					};
				});
			});
		}
	}

	function claimBalanceHandler() {
		setIsLoading(true);

		claimBalance(BONUS_GAME)
			.then(() => {
				setMessageModal("Saldo debitado na sua conta com sucesso!");
				setIsLoading(false);
			}).catch(() => {
				setMessageModal("Não foi possível reivindicar o seu saldo");
				setIsLoading(false);
			});
	}

	function confirmModalHandler() {
		setMessageModal("");
		ctxGame.clearUser();
		navigate("/home", { replace: true });
	}

	return( isLoading ? <Loading isEnable={isLoading}/> : (
		<RootContainer>
			<Header/>

			<Modal config={{
				isOpen: !!messageModal,
				label: messageModal,
				onConfirm: confirmModalHandler
			}}/>

			{ animationFeedback && (
				<ContainerAnimation>
					<Lottie
						height={200}
						width={200}
						options={{ animationData: animationFeedback, loop: false }}
					/>
				</ContainerAnimation>
			)}

			{/* Exibir perguntas */}
			{ selectedQuestion && (<>
				<Title>pergunta</Title>
				<Counter>{questionNumber} / 5</Counter>

				{ selectedQuestion && (
					<LabelStatement>
						{selectedQuestion.statement}
					</LabelStatement>
				)}

				<ContainerOptions>
					{ selectedQuestion?.options.map((option) => (
						<Option key={option.key}>
							<RadioButton
								id={option.key}
								name="option"
								type="radio"
								value={option.key}
								onChange={changeUserAnswerHandler}
							/>
							<LabelAnswer htmlFor={option.key}>
								{option.answer}
							</LabelAnswer>
						</Option>
					))}
				</ContainerOptions>

				<ContainerButtons>
					<Button
						label="Prosseguir"
						handler={nextQuestionHandler}
						colors={{
							background: theme.colors.background.secondary,
							shadow: theme.colors.shadow.secondary
						}}
					/>
				</ContainerButtons>
			</>)}

			{/* Exibir resultado */}
			{ !selectedQuestion && (
				<Option>
					<Label>Hey, {ctxGame.user.name}</Label>
					<Label>Você acertou {userPoints.correct} pergunta(s)</Label>
					<Label>Você errou {userPoints.incorrect} pergunta(s)</Label>

					<Space/>

					<Label>Total de Bônus:</Label>
					<Space/>
					<Balance value={balancePlayer}/>

					<Button
						label="Sacar"
						handler={claimBalanceHandler}
						colors={{
							background: theme.colors.background.secondary,
							shadow: theme.colors.shadow.secondary
						}}
					/>
				</Option>
			)}

		</RootContainer>
	)
	);
};

export default GamePage;
