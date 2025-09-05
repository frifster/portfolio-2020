import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Projects.module.less';

interface PasswordOptions {
    length: number;
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
    excludeAmbiguous: boolean;
}

type PasswordStrength = 'Very Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong' | 'Very Strong';

const PasswordGenerator: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [options, setOptions] = useState<PasswordOptions>({
        length: 12,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: false,
        excludeAmbiguous: false
    });
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [passwordHistory, setPasswordHistory] = useState<string[]>([]);
    const [strength, setStrength] = useState<PasswordStrength>('Fair');

    const characterSets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
        ambiguous: 'il1Lo0O'
    };

    const generatePassword = (): void => {
        let charset = '';
        
        if (options.includeUppercase) charset += characterSets.uppercase;
        if (options.includeLowercase) charset += characterSets.lowercase;
        if (options.includeNumbers) charset += characterSets.numbers;
        if (options.includeSymbols) charset += characterSets.symbols;

        if (options.excludeAmbiguous) {
            charset = charset.split('').filter(char => 
                !characterSets.ambiguous.includes(char)
            ).join('');
        }

        if (charset.length === 0) {
            setPassword('');
            return;
        }

        let newPassword = '';
        
        // Ensure at least one character from each selected category
        if (options.includeUppercase && characterSets.uppercase.length > 0) {
            const availableUppercase = options.excludeAmbiguous 
                ? characterSets.uppercase.split('').filter(c => !characterSets.ambiguous.includes(c))
                : characterSets.uppercase.split('');
            newPassword += availableUppercase[Math.floor(Math.random() * availableUppercase.length)];
        }
        
        if (options.includeLowercase && characterSets.lowercase.length > 0) {
            const availableLowercase = options.excludeAmbiguous 
                ? characterSets.lowercase.split('').filter(c => !characterSets.ambiguous.includes(c))
                : characterSets.lowercase.split('');
            newPassword += availableLowercase[Math.floor(Math.random() * availableLowercase.length)];
        }
        
        if (options.includeNumbers && characterSets.numbers.length > 0) {
            const availableNumbers = options.excludeAmbiguous 
                ? characterSets.numbers.split('').filter(c => !characterSets.ambiguous.includes(c))
                : characterSets.numbers.split('');
            newPassword += availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
        }
        
        if (options.includeSymbols && characterSets.symbols.length > 0) {
            newPassword += characterSets.symbols[Math.floor(Math.random() * characterSets.symbols.length)];
        }

        // Fill remaining length with random characters from charset
        for (let i = newPassword.length; i < options.length; i++) {
            newPassword += charset[Math.floor(Math.random() * charset.length)];
        }

        // Shuffle the password to avoid predictable patterns
        newPassword = newPassword.split('').sort(() => Math.random() - 0.5).join('');

        setPassword(newPassword);
        
        // Add to history (keep last 5)
        setPasswordHistory(prev => [newPassword, ...prev.slice(0, 4)]);
    };

    const calculateStrength = (pwd: string): PasswordStrength => {
        let score = 0;
        
        if (pwd.length >= 8) score += 1;
        if (pwd.length >= 12) score += 1;
        if (pwd.length >= 16) score += 1;
        if (/[a-z]/.test(pwd)) score += 1;
        if (/[A-Z]/.test(pwd)) score += 1;
        if (/[0-9]/.test(pwd)) score += 1;
        if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
        if (pwd.length >= 20) score += 1;

        if (score <= 2) return 'Very Weak';
        if (score <= 3) return 'Weak';
        if (score <= 4) return 'Fair';
        if (score <= 5) return 'Good';
        if (score <= 6) return 'Strong';
        return 'Very Strong';
    };

    const getStrengthColor = (strength: PasswordStrength): string => {
        switch (strength) {
            case 'Very Weak': return '#ef4444';
            case 'Weak': return '#f97316';
            case 'Fair': return '#eab308';
            case 'Good': return '#22c55e';
            case 'Strong': return '#16a34a';
            case 'Very Strong': return '#15803d';
            default: return '#6b7280';
        }
    };

    const copyToClipboard = async (text: string, index?: number): Promise<void> => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index ?? -1);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error('Failed to copy password:', err);
        }
    };

    const updateOption = (key: keyof PasswordOptions, value: boolean | number): void => {
        setOptions(prev => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        if (password) {
            setStrength(calculateStrength(password));
        }
    }, [password]);

    useEffect(() => {
        generatePassword();
    }, [options]);

    return (
        <>
            <h2>Password Generator</h2>
            <div className={styles.projectDesc}>
                <p>
                    <em>Generate secure passwords</em> - Create strong, customizable passwords 
                    with various character sets and security options.
                </p>
                
                <div className={styles.passwordGeneratorContainer}>
                    <div className={styles.passwordOutput}>
                        <div className={styles.generatedPassword}>
                            <input
                                type="text"
                                value={password}
                                readOnly
                                className={styles.passwordInput}
                                placeholder="Generated password will appear here"
                            />
                            <button
                                className={styles.copyButton}
                                onClick={() => copyToClipboard(password)}
                                disabled={!password}
                                title="Copy to clipboard"
                            >
                                {copiedIndex === -1 ? '✓' : '📋'}
                            </button>
                        </div>
                        
                        {password && (
                            <div className={styles.passwordStrength}>
                                <span className={styles.strengthLabel}>Strength:</span>
                                <span 
                                    className={styles.strengthValue}
                                    style={{ color: getStrengthColor(strength) }}
                                >
                                    {strength}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className={styles.passwordOptions}>
                        <div className={styles.optionGroup}>
                            <label className={styles.lengthControl}>
                                <span className={styles.optionLabel}>
                                    Length: <strong>{options.length}</strong>
                                </span>
                                <input
                                    type="range"
                                    min="4"
                                    max="50"
                                    value={options.length}
                                    onChange={(e) => updateOption('length', parseInt(e.target.value))}
                                    className={styles.lengthSlider}
                                />
                                <div className={styles.lengthLabels}>
                                    <span>4</span>
                                    <span>50</span>
                                </div>
                            </label>
                        </div>

                        <div className={styles.optionGroup}>
                            <h4 className={styles.groupTitle}>Character Types:</h4>
                            <label className={styles.checkboxOption}>
                                <input
                                    type="checkbox"
                                    checked={options.includeUppercase}
                                    onChange={(e) => updateOption('includeUppercase', e.target.checked)}
                                />
                                <span className={styles.checkboxLabel}>Uppercase (A-Z)</span>
                            </label>
                            
                            <label className={styles.checkboxOption}>
                                <input
                                    type="checkbox"
                                    checked={options.includeLowercase}
                                    onChange={(e) => updateOption('includeLowercase', e.target.checked)}
                                />
                                <span className={styles.checkboxLabel}>Lowercase (a-z)</span>
                            </label>
                            
                            <label className={styles.checkboxOption}>
                                <input
                                    type="checkbox"
                                    checked={options.includeNumbers}
                                    onChange={(e) => updateOption('includeNumbers', e.target.checked)}
                                />
                                <span className={styles.checkboxLabel}>Numbers (0-9)</span>
                            </label>
                            
                            <label className={styles.checkboxOption}>
                                <input
                                    type="checkbox"
                                    checked={options.includeSymbols}
                                    onChange={(e) => updateOption('includeSymbols', e.target.checked)}
                                />
                                <span className={styles.checkboxLabel}>Symbols (!@#$%^&*)</span>
                            </label>
                        </div>

                        <div className={styles.optionGroup}>
                            <h4 className={styles.groupTitle}>Advanced Options:</h4>
                            <label className={styles.checkboxOption}>
                                <input
                                    type="checkbox"
                                    checked={options.excludeAmbiguous}
                                    onChange={(e) => updateOption('excludeAmbiguous', e.target.checked)}
                                />
                                <span className={styles.checkboxLabel}>Exclude ambiguous characters (il1Lo0O)</span>
                            </label>
                        </div>
                    </div>

                    <div className={styles.passwordActions}>
                        <button
                            className={`${styles.gameButton} ${styles.primaryButton}`}
                            onClick={generatePassword}
                        >
                            🎲 Generate New Password
                        </button>
                    </div>

                    {passwordHistory.length > 1 && (
                        <div className={styles.passwordHistory}>
                            <h4 className={styles.historyTitle}>Recent Passwords:</h4>
                            <div className={styles.historyList}>
                                {passwordHistory.slice(1).map((pwd, index) => (
                                    <div key={index} className={styles.historyItem}>
                                        <span className={styles.historyPassword}>{pwd}</span>
                                        <button
                                            className={styles.historyCopyButton}
                                            onClick={() => copyToClipboard(pwd, index)}
                                            title="Copy to clipboard"
                                        >
                                            {copiedIndex === index ? '✓' : '📋'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PasswordGenerator;