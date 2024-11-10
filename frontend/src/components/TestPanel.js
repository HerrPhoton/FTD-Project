import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config' 

function TestPanel() {
    // Начальное состояния выбранного файла и функция его изменения
    const [selectedFile, setSelectedFile] = useState(null);
    // Вывод загруженного изображения и функция его изменения
    const [previewUrl, setPreviewUrl] = useState(null);
    // Состояние  инвертированного изображения и его функция изменения
    const [invertedImage, setInvertedImage] = useState(null);
    // Состояние загрузки и функция её изменения
    const [isLoading, setIsLoading] = useState(false);
    // Начальное состояние ошибки и функция её изменения
    const [error, setError] = useState(null);

    // Функция для загрузки файла
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setInvertedImage(null);
        setError(null);

        // Считываем файл, если считывание является успешным, то мы визуализуреум входной файл на странице
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Ставим загрузку
            setIsLoading(true);
            setError(null);

            const response = await axios.post(`${API_URL}/model/${selectedOption.toLowerCase()}/run`, {
                base64_image: previewUrl,
                conf: sliderValueConf,
                iou: sliderValueIou,
                max_det: sliderValueDet,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // Получаем данные обработанные сервером
            const processedImage = response.data.data.base64_image;
            setInvertedImage(processedImage);
        } catch (err) {
            console.error(err);
            setError('Произошла ошибка при обработке изображения.');
        } finally {
            setIsLoading(false);
        }
    };
    // Для выпадающего меню
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Выберите модель');


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const selectOption = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };
    const [sliderValueConf, setSliderValueConf] = useState(0.4); // Начальное значение ползунка
    const [sliderValueIou, setSliderValueIou] = useState(0.2); // Начальное значение ползунка
    const [sliderValueDet, setSliderValueDet] = useState(10); // Начальное значение ползунка
    
    return (
        <div class='intro'>
            <h3 class="h3">
                🔥 Попробуйте протестировать нашу модель 🔥
            </h3>
            <hr />
            <br />
            <div class='container'>
                <form onSubmit={handleSubmit} className='form'>
                    <div className="dropdown">
                        <button type="button" onClick={toggleDropdown} className="btn-test">
                            {selectedOption}
                        </button>
                        {isDropdownOpen && (
                            <ul className="dropdown-menu">
                                <li onClick={() => selectOption('Fire')}>Fire</li>
                                <li onClick={() => selectOption('Smoke')}>Smoke</li>
                                <li onClick={() => selectOption('All')}>All</li>
                            </ul>
                        )}
                    </div>
                    <div className="slider-container">
                        <label htmlFor="slider">Confidence:</label>
                        <input
                            type="range"
                            id="slider"
                            min="0.0"
                            max="1.0"
                            step='0.1'
                            value={sliderValueConf}
                            onChange={(e) => setSliderValueConf(e.target.value)}
                            className="slider"
                        />
                        <span className="slider-value">{sliderValueConf}</span>
                    </div>
                    <div className="slider-container">
                        <label htmlFor="slider">IOU:</label>
                        <input
                            type="range"
                            id="slider"
                            min="0.0"
                            max="1.0"
                            step='0.1'
                            value={sliderValueIou}
                            onChange={(e) => setSliderValueIou(e.target.value)}
                            className="slider"
                        />
                        <span className="slider-value">{sliderValueIou}</span>
                    </div>
                    <div className="slider-container">
                        <label htmlFor="slider">Max detections:</label>
                        <input
                            type="range"
                            id="slider"
                            min="1"
                            max="50"
                            step='1'
                            value={sliderValueDet}
                            onChange={(e) => setSliderValueDet(e.target.value)}
                            className="slider"
                        />
                        <span className="slider-value">{sliderValueDet}</span>
                    </div>
                    <input
                        type="file"
                        id="file-input"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file-input"
                    />
                    <label htmlFor="file-input" className="file-label">
                        {/* // Взависмисоти от состояния меняем текст лайбла у формы */}
                        {selectedFile ? selectedFile.name : 'Выберите изображение'}
                    </label>
                    <button type="submit" className="btn-test" disabled={isLoading}>
                        {/* // Взависимости от действия меняем название у кнопки */}
                        {isLoading ? 'Обработка...' : 'Тестирование'}
                    </button>

                </form>
                <div class='images-wrapper'>
                    {/* // Если закгружено изображение, то выводим его */}
                    {previewUrl && (
                        <div class='image-container3'>
                            <span className='text'>Исходное изображение:</span>
                            <hr />
                            <img src={previewUrl} className='image2' />
                        </div>
                    )}
                    {/* Если есть изображение, то выводим его   */}
                    {invertedImage && (
                        <div class='image-container3'>
                            <span className='text'>Обработанное изображение:</span>
                            <hr />
                            <img src={invertedImage} className='image2' />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestPanel;
