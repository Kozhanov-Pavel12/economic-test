import React from 'react';
import './Auth.css';
import Input from '../UI/input/Input';
import is from 'is_js'
import { connect } from 'react-redux'
import { auth } from '../../redux/actions/auth'

class Auth extends React.Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                type: 'email',
                value: '',
                label: 'Email',
                valid: false, 
                touched: false,
                errorMessage: 'Введите корректный Email',
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                type: 'password',
                value: '',
                label: 'Пароль',
                valid: false, 
                touched: false,
                errorMessage: 'Введите корректный пароль',
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }


    validateControl(value, validation) {
        if(!validation) {
            return true
        }

        let isValid = true


        //проверка на обязательность полей
        if(validation.required) {
            isValid = value.trim() !== '' && isValid
        }


        //проверка на структура email
        if(validation.email) {
           isValid = is.email(value) && isValid 
        }


        //проверка на минимальную длину пароля
        if(validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid;
    }


    onChangeHandler(e, controlName) {
        const formControls = { ...this.state.formControls } //получаем копию state
        const control = { ...formControls[controlName] } //получаем доступ к контролам (email, password)

        control.value = e.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation) //в функцию валидации полей

        formControls[controlName] = control

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name] && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }


    //генерируем поля input
    renderInputs = () => {
        return Object.keys( this.state.formControls ).map(( controlName, index ) => {
            const control = this.state.formControls[controlName]

            return (
                <Input 
                    key={controlName + index}
                    type={control.type}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    touched={control.touched}
                    valid={control.valid}
                    valid={control.value}
                    shouldValidate={!!control.validation}
                    onChange={e => this.onChangeHandler(e, controlName)}
                />
            )
        })
    }


    //отменяем стандартную отправку формы
    submitFormHandler(e) {
        e.preventDefault()
    }

    loginHandler = async () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )
    }

    registerHandler = async () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )
    }


    render() {
        return (
            <div className='auth'>
                <div>
                    <h1>Авторизация</h1>

                    <form className='auth-form' onSubmit={this.submitFormHandler}>

                        {
                            this.renderInputs()
                        }

                        <button 
                            className='button successBtn'
                            disabled={!this.state.isFormValid}
                            onClick={this.loginHandler}
                        >
                            Войти

                        </button>

                        <button 
                            className='button primaryBtn'
                            disabled={!this.state.isFormValid}
                            onClick={this.registerHandler}
                        >
                            Зарегистрироваться
                        </button>

                    </form>

                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth);