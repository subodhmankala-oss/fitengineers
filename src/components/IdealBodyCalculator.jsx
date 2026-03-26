import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import RelatedCalculators from './RelatedCalculators';
import './IdealBodyCalculator.css';

const IdealBodyCalculator = () => {
    const [unitMode, setUnitMode] = useState('metric'); // 'metric', 'us'
    const [age, setAge] = useState(25);
    const [gender, setGender] = useState('male');
    
    // Height state
    const [heightCm, setHeightCm] = useState(180);
    const [heightFt, setHeightFt] = useState(5);
    const [heightIn, setHeightIn] = useState(10);
    
    const [results, setResults] = useState(null);

    // Initial calculation on load
    useEffect(() => {
        calculateIBW();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const calculateIBW = (e) => {
        if (e) e.preventDefault();
        
        let targetHeightCm = heightCm;
        if (unitMode === 'us') {
            targetHeightCm = ((parseInt(heightFt) || 0) * 12 + (parseInt(heightIn) || 0)) * 2.54;
        }

        if (targetHeightCm <= 0) return;

        // Base formulas use inches over 5 ft (60 inches)
        const totalInches = targetHeightCm / 2.54;
        const inchesOver5Ft = totalInches > 60 ? (totalInches - 60) : 0;
        
        let robinson, miller, devine, hamwi;

        if (gender === 'male') {
            robinson = 52 + (1.9 * inchesOver5Ft);
            miller = 56.2 + (1.41 * inchesOver5Ft);
            devine = 50.0 + (2.3 * inchesOver5Ft);
            hamwi = 48.0 + (2.7 * inchesOver5Ft);
        } else {
            robinson = 49 + (1.7 * inchesOver5Ft);
            miller = 53.1 + (1.36 * inchesOver5Ft);
            devine = 45.5 + (2.3 * inchesOver5Ft);
            hamwi = 45.5 + (2.2 * inchesOver5Ft);
        }

        // BMI boundaries (18.5 - 25)
        const heightMeters = targetHeightCm / 100;
        const bmiMin = 18.5 * (heightMeters * heightMeters);
        const bmiMax = 25 * (heightMeters * heightMeters);

        const formatWeight = (kg) => {
            if (unitMode === 'metric') return `${kg.toFixed(1)} kg`;
            const lbs = kg * 2.20462;
            return `${lbs.toFixed(1)} lbs`;
        };

        setResults({
            robinson: formatWeight(robinson),
            miller: formatWeight(miller),
            devine: formatWeight(devine),
            hamwi: formatWeight(hamwi),
            bmiRange: `${formatWeight(bmiMin).replace(/ kg| lbs/g, '')} - ${formatWeight(bmiMax)}`
        });
    };

    const handleClear = () => {
        setAge('');
        setGender('male');
        setHeightCm('');
        setHeightFt('');
        setHeightIn('');
        setResults(null);
    };

    return (
        <section className="calculator-section pt-150 pb-100">
            <Helmet>
                <title>Ideal Weight Calculator | FitEngineerss</title>
                <meta name="description" content="Compute your ideal body weight (IBW) based on popular formulas." />
            </Helmet>
            <div className="container">
                <RelatedCalculators />

                <div className="calculator-header text-center mb-50">
                    <h1 className="section-title">Ideal Weight <span className="text-highlight">Calculator</span></h1>
                    <p className="section-subtitle-text mt-20">The Ideal Weight Calculator computes ideal body weight (IBW) ranges based on height, gender, and age. The idea of finding the IBW using a formula has been sought after by many experts for a long time. Currently, there persist several popular formulas, and our Ideal Weight Calculator provides their results for side-to-side comparisons.</p>
                </div>

                <div className="calculator-container-ibw">
                    
                    {/* Left Column - Form */}
                    <div className="calculator-form-container">
                        <div className="unit-tabs">
                            <button 
                                className={`unit-tab ${unitMode === 'us' ? 'active' : ''}`}
                                onClick={() => setUnitMode('us')}
                            >
                                US Units
                            </button>
                            <button 
                                className={`unit-tab ${unitMode === 'metric' ? 'active' : ''}`}
                                onClick={() => setUnitMode('metric')}
                            >
                                Metric Units
                            </button>
                        </div>
                        
                        <form className="ibw-form" onSubmit={calculateIBW}>
                            <div className="form-row">
                                <label>Age</label>
                                <div className="input-group">
                                    <input 
                                        type="number" 
                                        value={age} 
                                        onChange={(e) => setAge(e.target.value)} 
                                        min="2" max="80"
                                        className="form-control"
                                        style={{ maxWidth: '100px' }}
                                    />
                                    <span className="input-suffix">ages 2 - 80</span>
                                </div>
                            </div>

                            <div className="form-row">
                                <label>Gender</label>
                                <div className="radio-group">
                                    <label className="radio-label">
                                        <input 
                                            type="radio" 
                                            name="gender" 
                                            checked={gender === 'male'} 
                                            onChange={() => setGender('male')}
                                        />
                                        <span>male</span>
                                    </label>
                                    <label className="radio-label">
                                        <input 
                                            type="radio" 
                                            name="gender" 
                                            checked={gender === 'female'} 
                                            onChange={() => setGender('female')}
                                        />
                                        <span>female</span>
                                    </label>
                                </div>
                            </div>

                            <div className="form-row">
                                <label>Height</label>
                                <div className="input-group">
                                    {unitMode === 'metric' ? (
                                        <div className="input-with-label">
                                            <input 
                                                type="number" 
                                                value={heightCm} 
                                                onChange={(e) => setHeightCm(e.target.value)}
                                                className="form-control"
                                                style={{ maxWidth: '150px' }}
                                                step="0.1"
                                                required
                                            />
                                            <span className="input-unit">cm</span>
                                        </div>
                                    ) : (
                                        <div className="multi-input-group">
                                            <div className="input-with-label">
                                                <input 
                                                    type="number" 
                                                    value={heightFt} 
                                                    onChange={(e) => setHeightFt(e.target.value)}
                                                    className="form-control"
                                                    style={{ maxWidth: '80px' }}
                                                    required
                                                />
                                                <span className="input-unit">ft</span>
                                            </div>
                                            <div className="input-with-label ml-2">
                                                <input 
                                                    type="number" 
                                                    value={heightIn} 
                                                    onChange={(e) => setHeightIn(e.target.value)}
                                                    className="form-control"
                                                    style={{ maxWidth: '80px' }}
                                                />
                                                <span className="input-unit">in</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn btn-calculate">
                                    Calculate
                                </button>
                                <button type="button" className="btn btn-clear" onClick={handleClear}>
                                    Clear
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Column - Results */}
                    {results && (
                        <div className="calculator-results-container">
                            <div className="result-header">
                                <h3>Result</h3>
                            </div>
                            <div className="result-body">
                                <p className="result-intro">The ideal weight based on popular formulas:</p>
                                
                                <table className="ibw-table">
                                    <thead>
                                        <tr>
                                            <th>Formula</th>
                                            <th>Ideal Weight</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Robinson (1983)</td>
                                            <td className="weight-value">{results.robinson}</td>
                                        </tr>
                                        <tr>
                                            <td className="alt-row">Miller (1983)</td>
                                            <td className="alt-row weight-value">{results.miller}</td>
                                        </tr>
                                        <tr>
                                            <td>Devine (1974)</td>
                                            <td className="weight-value">{results.devine}</td>
                                        </tr>
                                        <tr>
                                            <td className="alt-row">Hamwi (1964)</td>
                                            <td className="alt-row weight-value">{results.hamwi}</td>
                                        </tr>
                                        <tr>
                                            <td>Healthy BMI Range</td>
                                            <td className="weight-value">{results.bmiRange}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
};

export default IdealBodyCalculator;
