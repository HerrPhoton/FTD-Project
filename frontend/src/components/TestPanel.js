import React, { useState } from 'react';
import axios from 'axios';

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
    // Получение инвертированного изображения
    const handleSubmit = async (event) => {
        event.preventDefault(); 

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            // Ставим загрузку
            setIsLoading(true);
            setError(null);

            const response = await axios.post('http://localhost:8000/invert-image/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob', // Важно для обработки бинарных данных
            });
            // Получаем данные обработанные сервером
            const imageUrl = URL.createObjectURL(response.data);
            setInvertedImage(imageUrl);
        } catch (err) {
            console.error(err);
            setError('Произошла ошибка при обработке изображения.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div class='intro'>
            <h3 class="h3">
            🔥 Попробуйте протестировать нашу модель 🔥
            </h3>
            <hr/>
            <br/>
            <div class='container'>
                <form onSubmit={handleSubmit} className='form'>
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
                            <hr/>
                            <img src={previewUrl} className='image2' />
                        </div>
                    )}
                    {/* Если есть изображение, то выводим его   */}
                    {invertedImage && (
                        <div class='image-container3'>
                            <span className='text'>Обработанное изображение:</span>
                            <hr/>
                            <img src={invertedImage} className='image2' />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestPanel;