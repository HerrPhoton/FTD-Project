import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();
    const searchContainerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setSearchResults([]);
                setIsActive(false);
                setSearchQuery('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const searchInContent = (query) => {
        if (query.length < 3) return [];

        const textNodes = [];
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        while (node = walker.nextNode()) {
            const parent = node.parentElement;
            if (
                parent.offsetParent !== null &&
                !['SCRIPT', 'STYLE'].includes(parent.tagName) &&
                node.textContent.trim()
            ) {
                textNodes.push({
                    text: node.textContent.trim(),
                    element: parent
                });
            }
        }

        return textNodes.filter(({ text }) =>
            text.toLowerCase().includes(query.toLowerCase())
        ).map(({ text, element }) => ({
            text,
            path: getElementPath(element),
            element
        }));
    };

    const getElementPath = (element) => {
        const pageIdentifiers = {
            'intro': 'Главная',
            'container_links': 'Ссылки',
            'container': 'Тест'
        };

        let current = element;
        let pageName = null;

        while (current && !pageName) {
            if (current.classList?.contains('intro')) {
                pageName = 'Главная';
                break;
            }
            if (current.classList?.contains('container_links')) {
                pageName = 'Ссылки';
                break;
            }
            if (current.classList?.contains('container')) {
                pageName = 'Тест';
                break;
            }
            current = current.parentElement;
        }

        const text = element.textContent.trim();
        let context = text;

        current = element;
        while (current) {
            if (current.tagName?.match(/^H[1-6]$/)) {
                context = `${current.textContent} → ${text}`;
                break;
            }
            current = current.parentElement;
        }

        if (!pageName) {
            return null;
        }

        return {
            page: pageName,
            context: context.length > 60 ? context.slice(0, 60) + '...' : context
        };
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const results = searchInContent(query);
        setSearchResults(results);
    };

    const handleResultClick = (result) => {
        // Прокручиваем к найденному элементу
        result.element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Получаем искомый текст
        const searchText = searchQuery.toLowerCase();
        const elementText = result.element.textContent;

        // Находим индекс искомого текста (без учета регистра)
        const startIndex = elementText.toLowerCase().indexOf(searchText);

        if (startIndex !== -1) {
            // Разбиваем текст на части: до, искомый текст и после
            const beforeText = elementText.slice(0, startIndex);
            const matchedText = elementText.slice(startIndex, startIndex + searchText.length);
            const afterText = elementText.slice(startIndex + searchText.length);

            // Заменяем содержимое элемента на текст с подсветкой
            const originalContent = result.element.innerHTML;
            result.element.innerHTML = `${beforeText}<mark class="highlight">${matchedText}</mark>${afterText}`;

            // Возвращаем оригинальное содержимое через 2 секунды
            setTimeout(() => {
                result.element.innerHTML = originalContent;
            }, 2000);
        }
        };

    return (
        <div className="search-container" ref={searchContainerRef}>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setIsActive(true)}
                placeholder="Поиск по странице..."
                className={`search-input ${isActive ? 'search-input-active' : ''}`}
            />

            {searchResults.length > 0 && (
                <div className="search-results">
                    {searchResults.map((result, index) => {
                        const pathInfo = getElementPath(result.element);
                        return pathInfo ? (
                            <div
                                key={index}
                                className="search-result-item"
                                onClick={() => handleResultClick(result)}
                            >
                                <div className="result-page">{pathInfo.page}</div>
                                <div className="result-text">{pathInfo.context}</div>
                            </div>
                        ) : null;
                    }).filter(Boolean)}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
