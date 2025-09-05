import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Projects.module.less';

type PaletteType = 'monochromatic' | 'complementary' | 'triadic' | 'analogous' | 'random';

const ColorGenerator: React.FC = () => {
    const [colors, setColors] = useState<string[]>([]);
    const [baseColor, setBaseColor] = useState<string>('#4ade80');
    const [paletteType, setPaletteType] = useState<PaletteType>('monochromatic');
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const hexToHsl = (hex: string): [number, number, number] => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const diff = max - min;

        let h = 0;
        if (diff !== 0) {
            if (max === r) h = ((g - b) / diff) % 6;
            else if (max === g) h = (b - r) / diff + 2;
            else h = (r - g) / diff + 4;
        }
        h = Math.round(h * 60);
        if (h < 0) h += 360;

        const l = (max + min) / 2;
        const s = diff === 0 ? 0 : diff / (1 - Math.abs(2 * l - 1));

        return [h, Math.round(s * 100), Math.round(l * 100)];
    };

    const hslToHex = (h: number, s: number, l: number): string => {
        const sNorm = s / 100;
        const lNorm = l / 100;

        const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = lNorm - c / 2;

        let r, g, b;
        if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
        else if (60 <= h && h < 120) [r, g, b] = [x, c, 0];
        else if (120 <= h && h < 180) [r, g, b] = [0, c, x];
        else if (180 <= h && h < 240) [r, g, b] = [0, x, c];
        else if (240 <= h && h < 300) [r, g, b] = [x, 0, c];
        else [r, g, b] = [c, 0, x];

        const toHex = (value: number): string => {
            const hex = Math.round((value + m) * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    const generatePalette = (): void => {
        const [h, s, l] = hexToHsl(baseColor);
        let newColors: string[] = [];

        switch (paletteType) {
            case 'monochromatic':
                newColors = [
                    hslToHex(h, s, Math.max(l - 40, 0)),
                    hslToHex(h, s, Math.max(l - 20, 0)),
                    baseColor,
                    hslToHex(h, s, Math.min(l + 20, 100)),
                    hslToHex(h, s, Math.min(l + 40, 100))
                ];
                break;
            case 'complementary':
                newColors = [
                    baseColor,
                    hslToHex((h + 180) % 360, s, l),
                    hslToHex(h, s, Math.max(l - 20, 0)),
                    hslToHex((h + 180) % 360, s, Math.max(l - 20, 0)),
                    hslToHex(h, Math.max(s - 30, 0), l)
                ];
                break;
            case 'triadic':
                newColors = [
                    baseColor,
                    hslToHex((h + 120) % 360, s, l),
                    hslToHex((h + 240) % 360, s, l),
                    hslToHex(h, Math.max(s - 20, 0), l),
                    hslToHex((h + 120) % 360, Math.max(s - 20, 0), l)
                ];
                break;
            case 'analogous':
                newColors = [
                    hslToHex((h - 30 + 360) % 360, s, l),
                    hslToHex((h - 15 + 360) % 360, s, l),
                    baseColor,
                    hslToHex((h + 15) % 360, s, l),
                    hslToHex((h + 30) % 360, s, l)
                ];
                break;
            default:
                newColors = Array(5).fill(0).map(() => {
                    const randomH = Math.floor(Math.random() * 360);
                    const randomS = Math.floor(Math.random() * 50) + 30;
                    const randomL = Math.floor(Math.random() * 40) + 30;
                    return hslToHex(randomH, randomS, randomL);
                });
        }

        setColors(newColors);
    };

    const copyToClipboard = async (color: string, index: number): Promise<void> => {
        try {
            await navigator.clipboard.writeText(color);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error('Failed to copy color:', err);
        }
    };

    const getTextColor = (backgroundColor: string): string => {
        const [, , l] = hexToHsl(backgroundColor);
        return l > 60 ? '#000000' : '#ffffff';
    };

    useEffect(() => {
        generatePalette();
    }, [baseColor, paletteType]);

    return (
        <>
            <h2>Color Palette Generator</h2>
            <div className={styles.projectDesc}>
                <p>
                    <em>Generate beautiful color palettes</em> - Create harmonious color schemes for your designs. 
                    Choose a base color and palette type to generate complementary colors instantly!
                </p>
                
                <div className={styles.colorGeneratorContainer}>
                    <div className={styles.colorControls}>
                        <div className={styles.colorInputGroup}>
                            <label className={styles.colorLabel}>Base Color:</label>
                            <div className={styles.colorInputWrapper}>
                                <input
                                    type="color"
                                    value={baseColor}
                                    onChange={(e) => setBaseColor(e.target.value)}
                                    className={styles.colorInput}
                                />
                                <input
                                    type="text"
                                    value={baseColor}
                                    onChange={(e) => setBaseColor(e.target.value)}
                                    className={styles.colorTextInput}
                                    placeholder="#4ade80"
                                />
                            </div>
                        </div>

                        <div className={styles.colorInputGroup}>
                            <label className={styles.colorLabel}>Palette Type:</label>
                            <select
                                value={paletteType}
                                onChange={(e) => setPaletteType(e.target.value as PaletteType)}
                                className={styles.colorSelect}
                            >
                                <option value="monochromatic">Monochromatic</option>
                                <option value="complementary">Complementary</option>
                                <option value="triadic">Triadic</option>
                                <option value="analogous">Analogous</option>
                                <option value="random">Random</option>
                            </select>
                        </div>

                        <button 
                            onClick={generatePalette}
                            className={styles.gameButton}
                        >
                            Generate New Palette
                        </button>
                    </div>

                    <div className={styles.colorPalette}>
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                className={styles.colorSwatch}
                                style={{ backgroundColor: color, color: getTextColor(color) }}
                                onClick={() => copyToClipboard(color, index)}
                                title={`Click to copy ${color}`}
                            >
                                <div className={styles.colorValue}>{color}</div>
                                {copiedIndex === index && (
                                    <div className={styles.copiedMessage}>Copied!</div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className={styles.colorInfo}>
                        <p>Click on any color to copy its hex code to clipboard</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ColorGenerator;