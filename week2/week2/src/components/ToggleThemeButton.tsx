import { useTheme } from '../context/ThemeContext';
import { THEME } from '../types/Theme';
import '../styles/mission1.css';
import clsx from 'clsx';

const ToggleThemeButton = () => {
    const { theme, toggleTheme } = useTheme();
    const isLightMode = theme === THEME.LIGHT;

    return (
        <>
        <button
            type="button"
            onClick={toggleTheme}
            style={{position: 'fixed', top: '50px', cursor: 'pointer'}}
            className={clsx({
                'theme-btn--light': isLightMode,
                'theme-btn--dark': !isLightMode
            })}
        >
            { isLightMode ? "🌞 라이트 모드" : "🌜다크 모드" }
        </button>
        </>
    )
}

export default ToggleThemeButton;