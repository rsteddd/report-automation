import { useState, useMemo, ChangeEvent } from 'react';
import { ReportData } from '../types';

export const useReportData = () => {
  const [data, setData] = useState<ReportData>({
    date: new Date().toISOString().split('T')[0],
    invested: '',
    leads: '',
    clicks: '',
    impressions: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const calculatedMetrics = useMemo(() => {
    const invested = parseFloat(data.invested) || 0;
    const leads = parseInt(data.leads, 10) || 0;
    const clicks = parseInt(data.clicks, 10) || 0;
    const impressions = parseInt(data.impressions, 10) || 0;

    const costPerClick = clicks > 0 ? (invested / clicks).toFixed(2) : '0.00';
    const costPerLead = leads > 0 ? (invested / leads).toFixed(2) : '0.00';
    
    // Формули розрахунку:
    // CTR (%): (Кліки / Покази) * 100
    // CPM ($): (Інвестовано / Покази) * 1000
    const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : '0.00';
    const cpm = impressions > 0 ? ((invested / impressions) * 1000).toFixed(2) : '0.00';
    
    return { costPerClick, costPerLead, ctr, cpm };
  }, [data.invested, data.leads, data.clicks, data.impressions]);

  const reportText = useMemo(() => {
    const { costPerClick, costPerLead, ctr, cpm } = calculatedMetrics;
    
    const formattedDate = data.date 
      ? new Date(data.date).toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' })
      : '[дата]';

    const investedText = data.invested ? `$${parseFloat(data.invested).toFixed(2)}` : '$[сума]';
    const leadsText = data.leads || '[кількість]';
    const clicksText = data.clicks || '[кількість]';
    
    const costPerClickText = data.invested && data.clicks ? `$${costPerClick}` : '$[сума]';
    const costPerLeadText = data.invested && data.leads ? `$${costPerLead}` : '$[сума]';
    const ctrText = data.clicks && data.impressions ? `${ctr}%` : '[відсоток]';
    const cpmText = data.invested && data.impressions ? `$${cpm}` : '$[сума]';

    return `📊 Звіт за період: ${formattedDate}
Інвестували: ${investedText}
Заявки: ${leadsText}
Вартість заявки: ${costPerLeadText}
Переходи: ${clicksText}
Ціна переходу: ${costPerClickText}
CTR: ${ctrText}
CPM: ${cpmText}`;
  }, [data, calculatedMetrics]);

  return { data, handleInputChange, reportText };
};
