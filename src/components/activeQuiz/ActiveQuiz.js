import AnswersList from '../answersList/AnswersList';
import './ActiveQuiz.css'

function ActiveQuiz(props) {
    return (
        <div className='active-quiz'>

            <p className='question'>
                <span>
                    <strong>{props.answerNumber}.</strong> &nbsp;
                    {props.question}
                </span>
                <small>{props.answerNumber} из {props.quizLength}</small>
            </p>

            <AnswersList 
                state={props.state}
                answers={props.answers}
                onClick={props.onAnswerClick}
            />

        </div>
    )
}

export default ActiveQuiz;