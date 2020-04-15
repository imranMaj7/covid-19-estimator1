const covid19ImpactEstimator = (data) => {
    const impact = impacts(data);
    const severeImpact = severeImpacts(data);
    return { data, impact, severeImpact };
  };
const avgDailyIncomeInUSD = 5;
const avgDailyIncomePopulation = 0.71;

const convertDays = (periodType, time) => {
  const days;
      if (periodType=="days") {
            days = 1 * time;
           }
      else if(periodType=="weeks"){
            days = 7 * time;
           }
      else if(periodType== "months"){
            days = 30 * time;
           }
        else{
           days = time;
           }
  return days;

};
// challange 1
const infectedAfterDays = (infected, periodType, time) => {
  const estimatedAfterDays = infected * 2 ** convertDays(periodType, time)/3;
  return estimatedAfterDays;
};
//challange 2
const severeCasesByTime = (infected) => {
return 0.15 * infected;
};
const hospitalBedsByTime = (severeCases, totalBeds) => {
  const availableBeds = 0.35* totalBeds;
  return Math.floor(availableBeds - severeCases);
};
// challenge 3
const casesForICU = (infections) => {
  return Math.floor(0.05 * infections);
};
const casesForVentilators = (infections) => {
 
  return Math.floor(0.02 * infections);
};
const DollarsInFlights = (infected,Income,Population,periodType,time) => {
  return Math.floor((infected * Income * Population) / converDays(periodType, time));
};
// impact Object
const impacts = (data) => {
  const impact = {};
  impact.currentlyInfected = data.reportedCases * 10;
  impact.infectionsByRequestedTime =infectedAfterDays(impact.currentlyInfected,data.periodType,data.timeToElapse);
  impact.severeCasesByRequestedTime = severeCasesByTime(impact.infectionsByRequestedTime);
  impact.hospitalBedsByRequestedTime = hospitalBedsByTime(impact.severeCasesByRequestedTime,data.totalHospitalBeds);
  impact.casesForICUByRequestedTime = casesForICU(impact.infectionsByRequestedTime);
  impact.casesForVentilatorsByRequestedTime = casesForVentilators(impact.infectionsByRequestedTime);
  impact.dollarsInFlight = dollarsInFlights(impact.infectionsByRequestedTime,avgDailyIncomeInUSD,avgDailyIncomePopulation,data.periodType,data.timeToElapse);
  return impact;
};
// severeImpact Object
const severeImpacts = (data) => {
  const severeImpact = {};
  severeImpact.currentlyInfected = data.reportedCases * 50;
  severeImpact.infectionsByRequestedTime = infectedAfterDays(severeImpact.currentlyInfected,data.periodType,data.timeToElapse);
  severeImpact.severeCasesByRequestedTime = severeCasesByTime(severeImpact.infectionsByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = hospitalBedsByTime(severeImpact.severeCasesByRequestedTime,data.totalHospitalBeds);
  severeImpact.casesForICUByRequestedTime = casesForICU(severeImpact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = casesForVentilators(severeImpact.infectionsByRequestedTime);
  severeImpact.dollarsInFlight = dollarsInFlights(severeImpact.infectionsByRequestedTime,avgDailyIncomeInUSD,avgDailyIncomePopulation,data.periodType,data.timeToElapse);

  return severeImpact;
};
