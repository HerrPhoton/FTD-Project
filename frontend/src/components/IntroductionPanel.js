import React, { useEffect, useState, useRef } from 'react';
function IntroductionPanel() {
  // Содержимое для описания блока проблем
    const images = [
        { src: 'fire1.png', caption: '335 тысяч', text: 'количество пожаров в России в год'},
        { src: 'fire2.png', caption: '5 минут', text: 'среднее время прибытия пожарных'},
        { src: 'fire3.png', caption: '8.2 тысяч', text: 'количество пострадавших при пожарах'},
        { src: 'fire4.png', caption: '7.8 тысяч', text: 'количество погибших при пожарах'},
    ];
    // Значение и функция смещения(скроллинга) страницы
    const [scrollPosition, setScrollPosition] = useState(0);
    // Используем useRef для получения ссылки на блок с изображениями
    const imageContainerRef = useRef(null); 
  
    useEffect(() => {
      // Функция, которая вызывается при прокрутке страницы
      const handleScroll = () => {
        // Проверка на существование ссылки
        if (imageContainerRef.current) {
          // Получаем положение элемента на экране
          const rect = imageContainerRef.current.getBoundingClientRect();
          // Получаем текущую вертикальную позицию прокрутки окна
          const scrollPos = window.pageYOffset;
          
          // Вычисляем позицию блока относительно верхней и нижней границ окна
          if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            // Если блок в видимой области, рассчитываем смещение
            const offsetFromTop = scrollPos - (scrollPos - rect.top) + window.innerHeight;
            // Обновляем состояние с новым значением смещения
            setScrollPosition(offsetFromTop);
          } else {
            // Если блок не виден, возвращаем изображения в исходное положение
            setScrollPosition(0);
          }
        }
      };
      // Добавляем слушатель события прокрутки
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        // Убираем слушатель события прокрутки при размонтировании компонента
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const calculateOffsetX = (initialOffsetX, direction) => {
      // Максимальное смещение по оси X
      const maxOffset = 200; 
      return initialOffsetX + direction * Math.min(maxOffset, scrollPosition / 3);
    };
  
    const calculateOffsetY = (initialOffsetY, direction) => {
      // Максимальное смещение по оси Y
      const maxOffset = 100; 
      return initialOffsetY + direction * Math.min(maxOffset, scrollPosition / 5);
    };
    return (
        <div className="intro">
            <div class="fire-wrapper">
              <span>🔥</span>
              <span>🔥</span>
            </div>
            <hr/>
            
            <div className="frame-container">
                <div className="image1-frame ">
                    <img src='img_1.jpg' className="image1"/>
                </div>
            </div>

            <h4>По данным Международной ассоциации пожарных и спасательных служб (CTIF) и МЧС России </h4>
            <hr/>
            <div className="gallery">
            {images.map((image, index) => (
                <div key={index} className="image-block">
                    <img src={image.src} alt={image.caption} className="image" />
                    <div className="caption">{image.caption}</div>
                    <br/>
                    <div className="description">{image.text}</div>
                </div>
            ))}
            </div>

            <h4>Наше решение</h4>
            <hr/>

            <p className="text">Мы предлагаем <b>решение</b> проблемы предупреждения возгорания. <br/>Сейчас повсеместно присутствуют камеры видеонаблюдения в помещениях и на улице,
                 с которых можно получать видеопоток и в дальнейшем обрабатывать его с помощью нейросетевого алгоритма, тем самым получая масштабируемую
                  систему для пожарной безопасности. 
                <br/>
                <br/>
                Как раз таки нашим продуктом является этот самый нейросетевой алгоритм, состоящий из двух детекционных моделей <b>Yolov8</b>. 
                Одна для детекции огня, вторая для дыма. Мы выделили дым, как отдельный признак возгорания, потому что по статистике МЧС  
                 более <b> 60% смертей происходит от удушья</b>, а не от высокой температуры.<br/>
                И в наше время пластика дым без огня весьма часто явление.</p>
            <br/>
            <div className="image-container2" ref={imageContainerRef}>
                <img src="ultralutics.jpeg" alt="Image 1" className="image-stack img1" style={{ 
          transform: `translate(${calculateOffsetX(0, -1)}px, ${calculateOffsetY(0, 1)}px)` // Двигаем влево и вниз
        }}/>
                <img src="yolov8.png" alt="Image 2" className="image-stack img2" style={{
            transform: `translate(${calculateOffsetX(0, 0)}px, ${calculateOffsetY(0, 0)}px)` // Не меняем позицию
        }}/>
                <img src="ultralutics.jpeg" alt="Image 3" className="image-stack img3"style={{ 
            transform: `translate(${calculateOffsetX(0, 1)}px, ${calculateOffsetY(0, -1)}px)` // Двигаем вправо и вверх
        }}/>
            </div>

            <h4>Наш результат</h4>
            <hr/>
            <div className="content-container">
                <img src="predict.gif" className="centered-gif" />
                <div className="metrics-container">
                    <div className="metric-card">
                      <div className="caption">Полнота</div>
                      <div className="metrics">95%</div>
                    </div>
                    <div className="metric-card">
                      <div className="caption">Точность</div>
                      <div className="metrics">98%</div>
                    </div>
                    <div className="metric-card">
                      <div className="caption">mAP0.5</div>
                      <div className="metrics">85%</div>
                    </div>
                </div>
            </div>
            <div class="fire-wrapper">
              <span>🔥</span>
              <span>🔥</span>
            </div>
        </div>
    );
}

export default IntroductionPanel;