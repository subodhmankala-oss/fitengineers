import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import RelatedCalculators from './RelatedCalculators';
import './IdealBodyCalculator.css'; // Reusing the identical premium style layout

const BMICalculator = () => {
    const [unitMode, setUnitMode] = useState('metric');
    
    // Inputs
    const [heightCm, setHeightCm] = useState(180);
    const [heightFt, setHeightFt] = useState(5);
    const [heightIn, setHeightIn] = useState(10);
    const [weightKg, setWeightKg] = useState(75);
    const [weightLbs, setWeightLbs] = useState(165);
    
    const [results, setResults] = useState(null);

    const calculateBMI = (e) => {
        if (e) e.preventDefault();
        
        let targetHeightMeters = heightCm / 100;
        let targetWeightKg = weightKg;

        if (unitMode === 'us') {
            const totalInches = (parseInt(heightFt) || 0) * 12 + (parseInt(heightIn) || 0);
            targetHeightMeters = (totalInches * 2.54) / 100;
            targetWeightKg = (parseFloat(weightLbs) || 0) / 2.20462;
        }

        if (targetHeightMeters <= 0 || targetWeightKg <= 0) return;

        const bmi = targetWeightKg / (targetHeightMeters * targetHeightMeters);
        const roundedBmi = bmi.toFixed(1);

        let category = 'Normal Weight';
        let categoryColor = '#008000'; // green

        if (bmi < 18.5) {
            category = 'Underweight';
            categoryColor = '#0db8d6'; // blue
        } else if (bmi >= 25 && bmi < 29.9) {
            category = 'Overweight';
            categoryColor = '#eab308'; // yellow
        } else if (bmi >= 30) {
            category = 'Obese';
            categoryColor = '#ef4444'; // red
        }

        setResults({
            score: roundedBmi,
            category: category,
            color: categoryColor
        });
    };

    const handleClear = () => {
        setHeightCm('');
        setHeightFt('');
        setHeightIn('');
        setWeightKg('');
        setWeightLbs('');
        setResults(null);
    };

    return (
        <section className="calculator-section pt-150 pb-100">
            <Helmet>
                <title>BMI Calculator | FitEngineerss</title>
                <meta name="description" content="Calculate your Body Mass Index (BMI)" />
            </Helmet>
            <div className="container">
                <RelatedCalculators />

                <div className="calculator-header text-center mb-50">
                    <h1 className="section-title">BMI <span className="text-highlight">Calculator</span></h1>
                    <p className="section-subtitle-text mt-20">The Body Mass Index (BMI) Calculator can be used to calculate BMI value and corresponding weight status while taking age into consideration.</p>
                </div>

                <div className="calculator-container-ibw">
                    {/* Left Column - Form */}
                    <div className="calculator-form-container">
                        <div className="unit-tabs">
                            <button 
                                type="button"
                                className={`unit-tab ${unitMode === 'us' ? 'active' : ''}`}
                                onClick={() => setUnitMode('us')}
                            > US Units </button>
                            <button 
                                type="button"
                                className={`unit-tab ${unitMode === 'metric' ? 'active' : ''}`}
                                onClick={() => setUnitMode('metric')}
                            > Metric Units </button>
                        </div>
                        
                        <form className="ibw-form" onSubmit={calculateBMI}>
                            <div className="form-row">
                                <label>Height</label>
                                <div className="input-group">
                                    {unitMode === 'metric' ? (
                                        <div className="input-with-label">
                                            <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="form-control" style={{ maxWidth: '150px' }} step="0.1" required />
                                            <span className="input-unit">cm</span>
                                        </div>
                                    ) : (
                                        <div className="multi-input-group">
                                            <div className="input-with-label">
                                                <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="form-control" style={{ maxWidth: '80px' }} required />
                                                <span className="input-unit">ft</span>
                                            </div>
                                            <div className="input-with-label ml-2">
                                                <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="form-control" style={{ maxWidth: '80px' }} />
                                                <span className="input-unit">in</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <label>Weight</label>
                                <div className="input-group">
                                    {unitMode === 'metric' ? (
                                        <div className="input-with-label">
                                            <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} className="form-control" style={{ maxWidth: '150px' }} step="0.1" required />
                                            <span className="input-unit">kg</span>
                                        </div>
                                    ) : (
                                        <div className="input-with-label">
                                            <input type="number" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} className="form-control" style={{ maxWidth: '150px' }} step="0.1" required />
                                            <span className="input-unit">lbs</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn btn-calculate">Calculate</button>
                                <button type="button" className="btn btn-clear" onClick={handleClear}>Clear</button>
                            </div>
                        </form>
                    </div>

                    {/* Right Column - Results */}
                    {results && (
                        <div className="calculator-results-container">
                            <div className="result-header">
                                <h3>Result</h3>
                            </div>
                            <div className="result-body text-center" style={{ padding: '40px 20px' }}>
                                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>{results.score}</div>
                                <div style={{ fontSize: '1.5rem', marginTop: '10px', color: results.color, fontWeight: 'bold' }}>{results.category}</div>
                                <p className="result-intro mt-20" style={{ marginTop: '30px' }}>
                                    Healthy BMI range: 18.5 kg/m² - 25 kg/m²
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BMICalculator;
