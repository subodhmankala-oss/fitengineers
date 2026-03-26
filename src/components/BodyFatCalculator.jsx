import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import RelatedCalculators from './RelatedCalculators';
import './IdealBodyCalculator.css'; 

const BodyFatCalculator = () => {
    const [unitMode, setUnitMode] = useState('metric');
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('');
    
    // Inputs (Metric)
    const [weightKg, setWeightKg] = useState('');
    const [heightCm, setHeightCm] = useState('');
    const [neckCm, setNeckCm] = useState('');
    const [waistCm, setWaistCm] = useState('');
    const [hipCm, setHipCm] = useState('');

    // Inputs (US)
    const [weightLbs, setWeightLbs] = useState('');
    const [heightFt, setHeightFt] = useState('');
    const [heightIn, setHeightIn] = useState('');
    const [neckIn, setNeckIn] = useState('');
    const [waistIn, setWaistIn] = useState('');
    const [hipIn, setHipIn] = useState('');
    
    const [results, setResults] = useState(null);

    const calculateBodyFat = (e) => {
        if (e) e.preventDefault();

        let hVal, nVal, wVal, hipVal, weightValKg;

        if (unitMode === 'metric') {
            hVal = parseFloat(heightCm);
            nVal = parseFloat(neckCm);
            wVal = parseFloat(waistCm);
            hipVal = parseFloat(hipCm);
            weightValKg = parseFloat(weightKg);
        } else {
            const hTotal = (parseInt(heightFt) || 0) * 12 + (parseInt(heightIn) || 0);
            hVal = hTotal * 2.54;
            nVal = parseFloat(neckIn) * 2.54;
            wVal = parseFloat(waistIn) * 2.54;
            hipVal = parseFloat(hipIn) * 2.54;
            weightValKg = parseFloat(weightLbs) / 2.20462;
        }

        if (!hVal || !nVal || !wVal || !weightValKg || !age || (gender === 'female' && !hipVal)) return;

        let bfPercent = 0;

        // U.S. Navy Method
        if (gender === 'male') {
            bfPercent = 495 / (1.0324 - 0.19077 * Math.log10(wVal - nVal) + 0.15456 * Math.log10(hVal)) - 450;
        } else {
            bfPercent = 495 / (1.29579 - 0.35004 * Math.log10(wVal + hipVal - nVal) + 0.22100 * Math.log10(hVal)) - 450;
        }

        bfPercent = Math.max(0, Math.min(bfPercent, 100)); // clamp between 0 and 100

        let category = 'Essential fat';
        if (gender === 'male') {
            if (bfPercent > 5 && bfPercent <= 13) category = 'Athletes';
            else if (bfPercent > 13 && bfPercent <= 17) category = 'Fitness';
            else if (bfPercent > 17 && bfPercent <= 24) category = 'Average';
            else if (bfPercent > 24) category = 'Obese';
        } else {
            if (bfPercent > 13 && bfPercent <= 20) category = 'Athletes';
            else if (bfPercent > 20 && bfPercent <= 24) category = 'Fitness';
            else if (bfPercent > 24 && bfPercent <= 31) category = 'Average';
            else if (bfPercent > 31) category = 'Obese';
        }

        let bodyFatMassKg = weightValKg * (bfPercent / 100);
        let leanBodyMassKg = weightValKg - bodyFatMassKg;
        
        let fatMassDisp = unitMode === 'metric' ? `${bodyFatMassKg.toFixed(1)} kg` : `${(bodyFatMassKg * 2.20462).toFixed(1)} lbs`;
        let leanMassDisp = unitMode === 'metric' ? `${leanBodyMassKg.toFixed(1)} kg` : `${(leanBodyMassKg * 2.20462).toFixed(1)} lbs`;

        setResults({
            percentage: bfPercent.toFixed(1),
            category: category,
            fatMass: fatMassDisp,
            leanMass: leanMassDisp
        });
    };

    const handleClear = () => {
        setResults(null);
    };

    return (
        <section className="calculator-section pt-150 pb-100">
            <Helmet>
                <title>Body Fat Calculator | FitEngineerss</title>
            </Helmet>
            <div className="container">
                <RelatedCalculators />

                <div className="calculator-header text-center mb-50">
                    <h1 className="section-title">Body Fat <span className="text-highlight">Calculator</span></h1>
                    <p className="section-subtitle-text mt-20">Estimate your body fat percentage, fat mass, and lean body mass.</p>
                </div>

                <div className="calculator-container-ibw">
                    {/* Left Column - Form */}
                    <div className="calculator-form-container">
                        <div className="unit-tabs">
                            <button type="button" className={`unit-tab ${unitMode === 'us' ? 'active' : ''}`} onClick={() => setUnitMode('us')}> US Units </button>
                            <button type="button" className={`unit-tab ${unitMode === 'metric' ? 'active' : ''}`} onClick={() => setUnitMode('metric')}> Metric Units </button>
                        </div>
                        
                        <form className="ibw-form" onSubmit={calculateBodyFat}>
                            <div className="form-row">
                                <label>Gender</label>
                                <div className="radio-group">
                                    <label className="radio-label"><input type="radio" name="gender" checked={gender === 'male'} onChange={() => setGender('male')}/><span>male</span></label>
                                    <label className="radio-label"><input type="radio" name="gender" checked={gender === 'female'} onChange={() => setGender('female')}/><span>female</span></label>
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <label>Age</label>
                                <div className="input-group">
                                    <div className="input-with-label">
                                        <input type="number" value={age} onChange={e => setAge(e.target.value)} className="form-control" style={{maxWidth:'100px'}} min="15" max="80" required/>
                                        <span className="input-unit">yrs</span>
                                    </div>
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
                                <label>Neck</label>
                                <div className="input-group">
                                    <div className="input-with-label">
                                        <input type="number" value={unitMode === 'metric' ? neckCm : neckIn} onChange={e => unitMode === 'metric' ? setNeckCm(e.target.value) : setNeckIn(e.target.value)} className="form-control" style={{maxWidth:'150px'}} step="0.1" required/>
                                        <span className="input-unit">{unitMode === 'metric' ? 'cm' : 'in'}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <label>Waist</label>
                                <div className="input-group">
                                    <div className="input-with-label">
                                        <input type="number" value={unitMode === 'metric' ? waistCm : waistIn} onChange={e => unitMode === 'metric' ? setWaistCm(e.target.value) : setWaistIn(e.target.value)} className="form-control" style={{maxWidth:'150px'}} step="0.1" required/>
                                        <span className="input-unit">{unitMode === 'metric' ? 'cm' : 'in'}</span>
                                    </div>
                                </div>
                            </div>

                            {gender === 'female' && (
                                <div className="form-row">
                                    <label>Hip</label>
                                    <div className="input-group">
                                        <div className="input-with-label">
                                            <input type="number" value={unitMode === 'metric' ? hipCm : hipIn} onChange={e => unitMode === 'metric' ? setHipCm(e.target.value) : setHipIn(e.target.value)} className="form-control" style={{maxWidth:'150px'}} step="0.1" required/>
                                            <span className="input-unit">{unitMode === 'metric' ? 'cm' : 'in'}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

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
                            <div className="result-body text-center" style={{ padding: '30px 20px' }}>
                                <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: 'var(--accent-color)', lineHeight: '1' }}>{results.percentage}%</div>
                                <div style={{ fontSize: '1.25rem', marginTop: '10px', color: 'var(--text-primary)' }}>Body Fat Category: <span style={{fontWeight:'bold'}}>{results.category}</span></div>
                                
                                <div style={{ marginTop: '35px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px 25px', borderRadius: '8px', minWidth: '140px', flex: '1' }}>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '5px' }}>Body Fat Mass</div>
                                        <div style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 'bold' }}>{results.fatMass}</div>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px 25px', borderRadius: '8px', minWidth: '140px', flex: '1', border: '1px solid rgba(14, 165, 233, 0.2)' }}>
                                        <div style={{ color: 'rgba(14, 165, 233, 0.8)', fontSize: '0.9rem', marginBottom: '5px' }}>Lean Body Mass</div>
                                        <div style={{ color: 'var(--accent-color)', fontSize: '1.4rem', fontWeight: 'bold' }}>{results.leanMass}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BodyFatCalculator;
