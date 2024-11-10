import {useNavigate, useLocation} from 'react-router-dom'
import React, {useState} from 'react'

function Slidebar(){
    const navigate = useNavigate()
    const location = useLocation()
    const handleClick = (path) =>{
        return (location.pathname === path);
    };
    const [isHovered, setIsHovered] = useState(4);
    return(
        <div className="navigation">
            <div  className={`logo ${isHovered > 4 ? 'logo-expanded' : ''}`} style={{ width: isHovered > 4 ? String(isHovered * 100) + 'px': '45px' }}>
                <img className='icon' src='logo.png'/>
            </div>
            <div className="button-group">
            <button
                    type="button"
                    className="btn"
                    onMouseEnter={() => setIsHovered(5.5)}
                    onMouseLeave={() => setIsHovered(4)}
                    onClick={() => navigate('/main')}
                    style={{ color: handleClick('/main') ? "#9B160A" : "#faf4e7" }}
                >
                    <span>Главная</span>
                </button>
                <button
                    type="button"
                    className="btn"
                    onMouseEnter={() => setIsHovered(6.5)}
                    onMouseLeave={() => setIsHovered(4)}
                    onClick={() => navigate('/api')}
                    style={{ color: handleClick('/api') ? "#9B160A" : "#faf4e7" }}
                >
                    <span>API</span>
                </button>
                <button
                    type="button"
                    className="btn"
                    onMouseEnter={() => setIsHovered(7.5)}
                    onMouseLeave={() => setIsHovered(4)}
                    onClick={() => navigate('/links')}
                    style={{ color: handleClick('/links') ? "#9B160A" : "#faf4e7" }}
                >
                    <span>Ссылки</span>
                </button>
                <button
                    type="button"
                    className="btn"
                    onMouseEnter={() => setIsHovered(8.5)}
                    onMouseLeave={() => setIsHovered(4)}
                    onClick={() => navigate('/test')}
                    style={{ color: handleClick('/test') ? "#9B160A" : "#faf4e7" }}
                >
                    <span>Тест</span>
                </button>
            </div>
        </div>  

    )
}
export default Slidebar;