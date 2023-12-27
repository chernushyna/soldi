import React, { useState } from 'react';
import './LanguageDropDown.css';
import Button from '../../../atoms/Button/Button';
import i18n from "../../../../helpers/i18n";

const LanguageDropDown = () => {
    const languages = ['ua', 'en'];
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        toggleDropdown();
        i18n.changeLanguage(language);
    };

    return (
        <div className="language-list-box">
            <Button onClick={toggleDropdown}>
                {selectedLanguage.toUpperCase()}
            </Button>
            {isDropdownOpen && (
                <div className="language-options">
                    {languages.map((language) => (
                        language !== selectedLanguage && (
                            <Button
                                key={language}
                                onClick={() => handleLanguageChange(language)}
                            >
                                {language.toUpperCase()}
                            </Button>
                        )
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageDropDown;
