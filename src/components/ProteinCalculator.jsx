import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import RelatedCalculators from './RelatedCalculators';
import CustomSelect from './CustomSelect';
import './IdealBodyCalculator.css';

const ProteinCalculator = () => {
    const [unitMode, setUnitMode] = useState('metric');
    
    // Inputs
    const [age, setAge] = useState(25);
    const [gender, setGender] = useState('male');
    const [heightCm, setHeightCm] = useState(180);
    const [heightFt, setHeightFt] = useState(5);
    const [heightIn, setHeightIn] = useState(10);
    const [weightKg, setWeightKg] = useState(75);
    const [weightLbs, setWeightLbs] = useState(165);
    
    const [goal, setGoal] = useState('maintain');
    const [activityScale, setActivityScale] = useState(1.55);
    
    const [results, setResults] = useState(null);

    const calculateProtein = (e) => {
        if (e) e.preventDefault();
        
        let targetHeightCm = heightCm;
        let targetWeightKg = weightKg;

        if (unitMode === 'us') {
            const totalInches = (parseInt(heightFt) || 0) * 12 + (parseInt(heightIn) || 0);
            targetHeightCm = totalInches * 2.54;
            targetWeightKg = (parseFloat(weightLbs) || 0) / 2.20462;
        }

        if (!targetHeightCm || !targetWeightKg || !age) return;

        // BMR (Mifflin-St Jeor)
        let bmr = 10 * targetWeightKg + 6.25 * targetHeightCm - 5 * age;
        bmr += (gender === 'male') ? 5 : -161;

        const tdee = bmr * activityScale;
        let targetCalories = tdee;

        if (goal === 'mildlose') targetCalories -= 250;
        else if (goal === 'lose') targetCalories -= 500;
        else if (goal === 'extremelose') targetCalories -= 1000;
        else if (goal === 'mildgain') targetCalories += 250;
        else if (goal === 'gain') targetCalories += 500;
        else if (goal === 'extremegain') targetCalories += 1000;

        // Optimal grams/kg multiplier based on goal and activity
        let multiplier = 1.6; // Base active
        
        if (goal.includes('lose')) {
            multiplier = 2.2; // Highest to preserve lean mass in deficit
        } else if (goal.includes('gain')) {
            multiplier = 2.0; // Surplus optimization
        } else { // maintain
            if (activityScale <= 1.2) multiplier = 0.8;
            else if (activityScale <= 1.375) multiplier = 1.2;
            else if (activityScale <= 1.55) multiplier = 1.6;
            else multiplier = 2.0;
        }

        const optimalGrams = Math.round(targetWeightKg * multiplier);
        const calProtein = Math.round((targetCalories * 0.3) / 4); // 30% of target diet

        setResults({
            optimal: Math.max(optimalGrams, Math.round(targetWeightKg * 1.0)),
            caloricBased: calProtein,
            minimum: Math.round(targetWeightKg * 0.8),
            maximum: Math.round(targetWeightKg * 2.4)
        });
    };

    const handleClear = () => {
        setResults(null);
    };

    return (
        <section className="calculator-section pt-150 pb-100">
            <Helmet>
                <title>Protein Calculator | FitEngineerss</title>
                <meta name="description" content="Calculate your optimal daily protein requirements." />
            </Helmet>
            <div className="container">
                <RelatedCalculators />

                <div className="calculator-header text-center mb-50">
                    <h1 className="section-title">Protein <span className="text-highlight">Calculator</span></h1>
                    <p className="section-subtitle-text mt-20">Calculate your exact daily protein needs based on your age, body metrics, goal, and activity level.</p>
                </div>

                <div className="calculator-container-ibw">
                    {/* Left Column - Form */}
                    <div className="calculator-form-container">
                        <div className="unit-tabs">
                            <button type="button" className={`unit-tab ${unitMode === 'us' ? 'active' : ''}`} onClick={() => setUnitMode('us')}> US Units </button>
                            <button type="button" className={`unit-tab ${unitMode === 'metric' ? 'active' : ''}`} onClick={() => setUnitMode('metric')}> Metric Units </button>
                        </div>
                        
                        <form className="ibw-form" onSubmit={calculateProtein}>
                            <div className="form-row">
                                <label>Age</label>
                                <div className="input-group">
                                    <input type="number" value={age} onChange={e => setAge(e.target.value)} className="form-control" style={{maxWidth:'100px'}} min="15" max="80" required/>
                                    <span className="input-suffix">years</span>
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <label>Sex</label>
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
                                <label>Goal</label>
                                <div className="input-group" style={{ flex: 1 }}>
                                    <CustomSelect 
                                        value={goal}
                                        onChange={(val) => setGoal(val)}
                                        options={[
                                            { value: 'maintain', label: 'Maintain weight' },
                                            { value: 'mildlose', label: 'Mild weight loss of 0.5 lb (0.25 kg) per week' },
                                            { value: 'lose', label: 'Weight loss of 1 lb (0.5 kg) per week' },
                                            { value: 'extremelose', label: 'Extreme weight loss of 2 lb (1 kg) per week' },
                                            { value: 'mildgain', label: 'Mild weight gain of 0.5 lb (0.25 kg) per week' },
                                            { value: 'gain', label: 'Weight gain of 1 lb (0.5 kg) per week' },
                                            { value: 'extremegain', label: 'Extreme weight gain of 2 lb (1 kg) per week' }
                                        ]}
                                    />
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
                                    <thead><tr><th>Diet Goal</th><th>Daily Protein</th></tr></thead>
                                    <tbody>
                                        <tr><td>ADA Minimum Requirement</td><td className="weight-value text-center">{results.minimum} g</td></tr>
                                        <tr><td className="alt-row" style={{fontWeight: 'bold', color:'var(--text-primary)'}}>Optimal For Your Goal</td><td className="alt-row weight-value text-center" style={{fontSize: '1.4rem', color: 'var(--accent-color)'}}>{results.optimal} g</td></tr>
                                        <tr><td>Macro Diet (30% Daily Calories)</td><td className="weight-value text-center">{results.caloricBased} g</td></tr>
                                        <tr><td className="alt-row">Absolute Maximum (Diminishing)</td><td className="alt-row weight-value text-center">{results.maximum} g</td></tr>
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

export default ProteinCalculator;
