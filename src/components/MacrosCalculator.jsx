import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import RelatedCalculators from './RelatedCalculators';
import CustomSelect from './CustomSelect';
import './IdealBodyCalculator.css';

const MacrosCalculator = () => {
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
    const [activeTab, setActiveTab] = useState('balanced');

    const calculateMacros = (e) => {
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

        // Math: 1g carb = 4 cal, 1g protein = 4 cal, 1g fat = 9 cal
        const getMacroGrams = (cals, pct, cpg) => Math.round((cals * pct) / cpg);

        const sugar = Math.round((targetCalories * 0.1) / 4);
        const satFat = Math.round((targetCalories * 0.1) / 9);
        const kj = Math.round(targetCalories * 4.184);

        const baseResult = {
            calories: Math.round(targetCalories),
            sugar,
            satFat,
            kj
        };

        // Industry standard optimal macro percentages:
        const balanced = { ...baseResult, protein: getMacroGrams(targetCalories, 0.25, 4), carbs: getMacroGrams(targetCalories, 0.50, 4), fat: getMacroGrams(targetCalories, 0.25, 9) };
        const lowFat = { ...baseResult, protein: getMacroGrams(targetCalories, 0.25, 4), carbs: getMacroGrams(targetCalories, 0.55, 4), fat: getMacroGrams(targetCalories, 0.20, 9) };
        const lowCarb = { ...baseResult, protein: getMacroGrams(targetCalories, 0.40, 4), carbs: getMacroGrams(targetCalories, 0.20, 4), fat: getMacroGrams(targetCalories, 0.40, 9) };
        const highProtein = { ...baseResult, protein: getMacroGrams(targetCalories, 0.40, 4), carbs: getMacroGrams(targetCalories, 0.35, 4), fat: getMacroGrams(targetCalories, 0.25, 9) };

        setResults({ balanced, lowFat, lowCarb, highProtein });
    };

    const handleClear = () => {
        setResults(null);
        setActiveTab('balanced');
    };

    const renderResultsPanel = () => {
        if (!results) return null;
        const currentData = results[activeTab];

        return (
            <div className="calculator-results-container">
                <div className="result-header"><h3>Result</h3></div>
                <div className="result-body">
                    <div className="macro-results-panel">
                        <div className="macro-tabs">
                            <button type="button" className={activeTab === 'balanced' ? 'active' : ''} onClick={() => setActiveTab('balanced')}>Balanced</button>
                            <button type="button" className={activeTab === 'lowFat' ? 'active' : ''} onClick={() => setActiveTab('lowFat')}>Low Fat</button>
                            <button type="button" className={activeTab === 'lowCarb' ? 'active' : ''} onClick={() => setActiveTab('lowCarb')}>Low Carb</button>
                            <button type="button" className={activeTab === 'highProtein' ? 'active' : ''} onClick={() => setActiveTab('highProtein')}>High Protein</button>
                        </div>

                        <div className="macro-result-table-wrapper">
                            <table className="macro-result-table">
                                <tbody>
                                    <tr>
                                        <td className="macro-label">Protein</td>
                                        <td className="macro-value">
                                            <div className="val-main"><strong>{currentData.protein}</strong> grams/day</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="macro-label">Carbs<br/><small>Includes Sugar</small></td>
                                        <td className="macro-value">
                                            <div className="val-main"><strong>{currentData.carbs}</strong> grams/day</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="macro-label">Fat<br/><small>Includes Saturated Fat</small></td>
                                        <td className="macro-value">
                                            <div className="val-main"><strong>{currentData.fat}</strong> grams/day</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="macro-label">Sugar</td>
                                        <td className="macro-value">
                                            <div className="val-main"><strong>&lt;{currentData.sugar}</strong> grams/day</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="macro-label">Saturated Fat</td>
                                        <td className="macro-value">
                                            <div className="val-main"><strong>&lt;{currentData.satFat}</strong> grams/day</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="macro-label">Food Energy</td>
                                        <td className="macro-value">
                                            <div className="val-main"><strong>{currentData.calories.toLocaleString()}</strong> Calories/day</div>
                                            <div className="macro-range">or {currentData.kj.toLocaleString()} kJ/day</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="calculator-section pt-150 pb-100">
            <Helmet>
                <title>Macros Calculator | FitEngineerss</title>
                <meta name="description" content="Calculate your daily macronutrient breakdown for carbs, protein, and fat." />
            </Helmet>
            <div className="container">
                <RelatedCalculators />

                <div className="calculator-header text-center mb-50">
                    <h1 className="section-title">Macros <span className="text-highlight">Calculator</span></h1>
                    <p className="section-subtitle-text mt-20">Find out exactly how many carbohydrates, proteins, and fats you should eat every day to reach your fitness goals.</p>
                </div>

                <div className="calculator-container-ibw">
                    {/* Left Column - Form */}
                    <div className="calculator-form-container">
                        <div className="unit-tabs">
                            <button type="button" className={`unit-tab ${unitMode === 'us' ? 'active' : ''}`} onClick={() => setUnitMode('us')}> US Units </button>
                            <button type="button" className={`unit-tab ${unitMode === 'metric' ? 'active' : ''}`} onClick={() => setUnitMode('metric')}> Metric Units </button>
                        </div>
                        
                        <form className="ibw-form" onSubmit={calculateMacros}>
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
                    {renderResultsPanel()}
                </div>
            </div>
        </section>
    );
};

export default MacrosCalculator;
