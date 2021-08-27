import './FinishedQuiz.css';
import {Link} from 'react-router-dom'
import Button from '../UI/button/Button'

function FinishedQuiz(props) {

    const successCount = Object.keys(props.results).reduce((total, key) => {
        if(props.results[key] === 'success') {
            total ++
        }

        return total
    }, 0)

    return (
        <div className='finished-quiz'>

            <ul>
                {
                    props.quiz.map((quizItem, index) => {
                        const cls = [
                            'fas',
                            props.results[quizItem.id] === 'error' ? 'fa-times error' : 'fa-check success'
                        ]

                        return (
                            <li key={index}>
                                <strong>{index + 1}</strong>. &nbsp;
                                {quizItem.question}
                                <i className={cls.join(' ')}/>
                            </li>
                        )
                    })
                }

            </ul>

            <p>Правильно {successCount} из {props.quiz.length}</p>

            <div>
                <Button onClick={props.onRetry} type='button repeatBtn'>Повторить</Button>

                <Link to='/quiz-list'>
                    <Button type='button primaryBtn'>Перейти в список тестов</Button>
                </Link>

            </div>

        </div>
    )
}

export default FinishedQuiz;