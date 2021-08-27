import React from 'react'
import './QuizCreator.css'
import { createControl, validate, validateForm } from '../form/formFramework'
import Input from '../UI/input/Input'
import Select from '../UI/select/Select'
import Auxiliary from '../auxiliary/Auxiliary'
import { connect } from 'react-redux';
import { createQuizQuestion, finishCreateQuiz } from '../../redux/actions/create'


function createOptionControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым!',
        id: number
    }, {required: true})
}


function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым!'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

class QuizCreator extends React.Component {

    state = {
        isFormValid: false,
        formControls: createFormControls(),
        rightAnswerId: 1
    }

    submitHandler = e => {
        e.preventDefault()
    }

    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] }

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    addQuestionHandler = event => {
        event.preventDefault()

        const {question, option1, option2, option3, option4 } = this.state.formControls

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }

        this.props.createQuizQuestion(questionItem)

        this.setState({
            isFofmValid: false,
            formControls: createFormControls(),
            rightAnswerId: 1
        })
    }

    createQuizHandler = e => {
        e.preventDefault()

        this.setState({
            isFofmValid: false,
            formControls: createFormControls(),
            rightAnswerId: 1
        })

        this.props.finishCreateQuiz()
    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Auxiliary key={ controlName + index }>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />

                    {
                        index === 0 ? <hr /> : null
                    }
                </Auxiliary>
            )
        })
    }

    selectChangeHandler = (event) => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }


    render() {

        const select = <Select 
            label='Выберите правильный ответ'
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />

        return (
            <div className='test-creator'>
                <div>
                    <h2>Создание теста</h2>
                    <form onSubmit={this.submitHandler}>

                        {
                            this.renderControls()
                        }

                        { select }


                        <button
                            className='button primaryBtn'
                            disabled={!this.state.isFormValid}
                            onClick={this.addQuestionHandler}
                        >
                            Добавить вопрос
                        </button>


                        <button
                            className='button repeatBtn'
                            disabled={this.props.quiz.length === 0}
                            onClick={this.createQuizHandler}
                        >
                            Создать тест
                        </button>

                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch( createQuizQuestion(item) ),
        finishCreateQuiz: () => dispatch( finishCreateQuiz() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator) ;