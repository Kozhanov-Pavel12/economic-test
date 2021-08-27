import React from 'react';
import ActiveQuiz from '../activeQuiz/ActiveQuiz';
import FinishedQuiz from '../finishedQuiz/FinishedQuiz';
import './Quiz.css'
import Loader from '../loader/Loader';
import { connect } from 'react-redux'
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../redux/actions/fetchQuizes'

class Quiz extends React.Component {

    componentWillUnmount() {
        this.props.retryQuiz()
    }

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    render() {
        return (
            <div className='quiz'>
                <div className='quiz-wrapper'>

                    {
                        this.props.isQuizFinished
                        ? <h2>Результаты тестирования</h2>
                        : <h2>Ответьте на поставленные вопросы</h2>
                    }

                    {
                        this.props.loading || !this.props.quiz
                        ? <Loader />
                        : this.props.isQuizFinished
                            ? <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                onRetry={this.retryQuiz}
                            />
                            : <ActiveQuiz
                                question={this.props.quiz[this.props.activeQuestion].question}
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                onAnswerClick={this.props.quizAnswerClick}
                                quizLength={this.props.quiz.length}
                                answerNumber={this.props.activeQuestion + 1}
                                state={this.props.answerState}
                            />
                            
                    }

                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        activeQuestion: state.quiz.activeQuestion,
        isQuizFinished: state.quiz.isQuizFinished,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch( fetchQuizById(id) ),
        quizAnswerClick: answerId => dispatch( quizAnswerClick(answerId) ),
        retryQuiz: () => dispatch( retryQuiz() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);