import AnswerItem from '../answerItem/AnswerItem';
import './AnswersList.css'

function AnswersList(props) {
    return (
        <div>

            <ul className='answers-list'>
                {
                    props.answers.map((answer, index) => {
                        return (
                            <AnswerItem 
                                key={index} 
                                answer={answer}
                                onAnswerClick={props.onClick}
                                state={props.state ? props.state[answer.id] : null}
                            />
                        )
                    })
                }
            </ul>

        </div>
    )
}

export default AnswersList;