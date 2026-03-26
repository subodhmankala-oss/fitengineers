import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './IdealBodyCalculator.css';

const RelatedCalculators = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const calculators = [
        { path: '/ideal-body-calculator', name: 'Ideal Weight Calculator' },
        { path: '/bmi-calculator', name: 'BMI Calculator' },
        { path: '/body-fat-calculator', name: 'Body Fat Calculator' },
        { path: '/calorie-calculator', name: 'Calorie Calculator' },
        { path: '/protein-calculator', name: 'Protein Calculator' },
        { path: '/carb-calculator', name: 'Carb Calculator' },
        { path: '/macros-calculator', name: 'Macros Calculator' }
    ];

    return (
        <div className="related-calculators">
            <div className="related-label">Related Calculators</div>
            <div className="related-links">
                {calculators.filter(calc => calc.path !== currentPath).map(calc => (
                    <Link key={calc.path} to={calc.path} className="btn-related">
                        {calc.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedCalculators;
