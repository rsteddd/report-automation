import React from 'react';
import { ReportData } from '../types';
import Input from './Input';

interface ReportFormProps {
    data: ReportData;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ data, onInputChange }) => {
    return (
        <div className="bg-slate-900/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-lg transition-all duration-300 hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/10">
            <h2 className="text-2xl font-semibold mb-6 text-slate-100">Введіть дані</h2>
            <form className="space-y-5">
                <Input
                    label="Дата звіту"
                    id="date"
                    type="date"
                    value={data.date}
                    onChange={onInputChange}
                />
                <Input
                    label="Інвестовано ($)"
                    id="invested"
                    type="number"
                    placeholder="напр. 22.12"
                    value={data.invested}
                    onChange={onInputChange}
                />
                <Input
                    label="Заявки"
                    id="leads"
                    type="number"
                    placeholder="напр. 16"
                    value={data.leads}
                    onChange={onInputChange}
                    description="(початі розмови, нові контакти)"
                />
                <Input
                    label="Переходи (Кліки)"
                    id="clicks"
                    type="number"
                    placeholder="напр. 14"
                    value={data.clicks}
                    onChange={onInputChange}
                />
                <Input
                    label="Покази (Impressions)"
                    id="impressions"
                    type="number"
                    placeholder="напр. 4230"
                    value={data.impressions}
                    onChange={onInputChange}
                />
            </form>
        </div>
    );
};

export default ReportForm;
