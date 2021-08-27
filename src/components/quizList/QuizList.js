import React from 'react';
import { NavLink } from 'react-router-dom';
import './QuizList.css'
import Loader from '../loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizes } from '../../redux/actions/fetchQuizes'

class QuizList extends React.Component {

    renderQuizes() {
        return this.props.quizes.map((quiz, index) => {
            return (
                <div className='test-box' key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </div>
            )
        })
    }

    async componentDidMount() {
        this.props.fetchQuizes()
    }

    render() {
        return (
            <div className='quiz-list'>
                <div>
                    <h1>Тест - сектор</h1>

                    <div className='test-boxes'>

                        {
                            this.props.loading 
                            ? <Loader /> 
                            : this.renderQuizes()
                        }
        
                    
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}


function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch( fetchQuizes() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);