import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import RelatedCalculators from './RelatedCalculators';
import CustomSelect from './CustomSelect';
import './IdealBodyCalculator.css'; 

const CalorieCalculator = () => {
    const [unitMode, setUnitMode] = useState('metric');
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState(25);
    const [activityScale, setActivityScale] = useState(1.55); // Moderate activity
    
    // Height & Weight
    const [heightCm, setHeightCm] = useState(180);
    const [heightFt, setHeightFt] = useState(5);
    const [heightIn, setHeightIn] = useState(10);
    const [weightKg, setWeightKg] = useState(75);
    const [weightLbs, setWeightLbs] = useState(165);
    
    const [results, setResults] = useState(null);

    const calculateCalories = (e) => {
        if (e) e.preventDefault();
        
        let targetHeightCm = heightCm;
        let targetWeightKg = weightKg;

        if (unitMode === 'us') {
            const totalInches = (parseInt(heightFt) || 0) * 12 + (parseInt(heightIn) || 0);
            targetHeightCm = totalInches * 2.54;
            targetWeightKg = (parseFloat(weightLbs) || 0) / 2.20462;
        }

        if (!targetHeightCm || !targetWeightKg || !age) return;

        // Mifflin-St Jeor Equation
        let bmr = 10 * targetWeightKg + 6.25 * targetHeightCm - 5 * age;
        bmr += (gender === 'male') ? 5 : -161;

        const maintenance = Math.round(bmr * activityScale);

        setResults({
            maintenance,
            mildLoss: maintenance - 250,
            weightLoss: maintenance - 500,
            extremeLoss: maintenance - 1000,
            mildGain: maintenance + 250,
            weightGain: maintenance + 500
        });
    };

    const handleClear = () => {
        setResults(null);
    };

    return (
        <section className="calculator-section pt-150 pb-100">
            <Helmet>
                <title>Calorie Calculator | FitEngineerss</title>
            </Helmet>
            <div className="container">
                <RelatedCalculators />

                <div className="calculator-header text-center mb-50">
                    <h1 className="section-title">Calorie <span className="text-highlight">Calculator</span></h1>
                    <p className="section-subtitle-text mt-20">Estimate the number of calories you need to consume each day to maintain, lose, or gain weight.</p>
                </div>

                <div className="calculator-container-ibw">
                    {/* Left Column - Form */}
                    <div className="calculator-form-container">
                        <div className="unit-tabs">
                            <button type="button" className={`unit-tab ${unitMode === 'us' ? 'active' : ''}`} onClick={() => setUnitMode('us')}> US Units </button>
                            <button type="button" className={`unit-tab ${unitMode === 'metric' ? 'active' : ''}`} onClick={() => setUnitMode('metric')}> Metric Units </button>
                        </div>
                        
                        <form className="ibw-form" onSubmit={calculateCalories}>
                            <div className="form-row">
                                <label>Age</label>
                                <div className="input-group">
                                    <input type="number" value={age} onChange={e => setAge(e.target.value)} className="form-control" style={{maxWidth:'100px'}} min="15" max="80" required/>
                                    <span className="input-suffix">ages 15 - 80</span>
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <label>Gender</label>
                                <div className="radio-group">
                                    <label className="radio-label"><input type="radio" name="gender" checked={gender === 'male'} onChange={() => setGender('male')}/><span>male</span></label>
                                    <label className="radio-label"><input type="radio" name="gender" checked={gender === 'female'} onChange={() => setGender('female')}/><span>female</span></label>
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <label>Height</label>
                                <div className="input-group">
                                    {unitMode === 'metric' ? (
                                        <div className="input-with-label">
                                            <input type="number" value={heightCm} onChange={e => setHeightCm(e.target.value)} className="form-control" style={{maxWidth:'150px'}} step="0.1" required/>
                                            <span className="input-unit">cm</span>
                                        </div>
                                    ) : (
                                        <div className="multi-input-group">
                                            <div className="input-with-label">
                                                <input type="number" value={heightFt} onChange={e => setHeightFt(e.target.value)} className="form-control" style={{maxWidth:'80px'}} required/>
                                                <span className="input-unit">ft</span>
                                            </div>
                                            <div className="input-with-label ml-2">
                                                <input type="number" value={heightIn} onChange={e => setHeightIn(e.target.value)} className="form-control" style={{maxWidth:'80px'}}/>
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

                            <div className="form-row">
                                <label>Activity Level</label>
                                <div className="input-group" style={{ flex: 1 }}>
                                    <CustomSelect 
                                        value={activityScale}
                                        onChange={(val) => setActivityScale(parseFloat(val))}
                                        options={[
                                            { value: 1.0, label: 'Basal Metabolic Rate (BMR)' },
                                            { value: 1.2, label: 'Sedentary: little or no exercise' },
                                            { value: 1.375, label: 'Light: exercise 1-3 times/week' },
                                            { value: 1.465, label: 'Moderate: exercise 4-5 times/week' },
                                            { value: 1.55, label: 'Active: daily exercise or intense exercise 3-4 times/week' },
                                            { value: 1.725, label: 'Very Active: intense exercise 6-7 times/week' },
                                            { value: 1.9, label: 'Extra Active: very intense exercise daily, or physical job' }
                                        ]}
                                    />
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
                            <div className="result-header"><h3>Result</h3></div>
                            <div className="result-body">
                                <table className="ibw-table">
                                    <thead><tr><th>Goal</th><th>Daily Calories</th></tr></thead>
                                    <tbody>
                                        <tr><td>Maintain weight</td><td className="weight-value text-center" style={{fontSize: '1.2rem'}}>{results.maintenance}</td></tr>
                                        <tr><td className="alt-row">Mild weight loss<br/><small style={{color:'var(--text-secondary)'}}>0.25 kg/week</small></td><td className="alt-row weight-value text-center">{results.mildLoss}</td></tr>
                                        <tr><td>Weight loss<br/><small style={{color:'var(--text-secondary)'}}>0.5 kg/week</small></td><td className="weight-value text-center">{results.weightLoss}</td></tr>
                                        <tr><td className="alt-row">Extreme weight loss<br/><small style={{color:'var(--text-secondary)'}}>1 kg/week</small></td><td className="alt-row weight-value text-center">{results.extremeLoss}</td></tr>
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

export default CalorieCalculator;
