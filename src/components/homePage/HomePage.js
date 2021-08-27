import { Link } from 'react-router-dom';
import './HomePage.css'

function HomePage() {

    return (
        <div className='home-page'>
            <div>

                <Link to='/quiz-list'>
                    <button className='button successBtn'>Перейти в тест - сектор</button> 
                </Link>

                <h1>Экзаменационные тесты по базовым экономическим дисциплинам</h1>

            </div>
        </div>
    )
}

export default HomePage;