export const endpoints = {
  all: "monitoring/patients/all/",
  debtors: "monitoring/patients/debtor/",
  treated: "/monitoring/patients/treated/",
  treatment: "/monitoring/patients/under-treatment/",
  statistic: "/monitoring/patients/statistics/",
  userCount: "/monitoring/tomorrow-appointments-count/",
  userCountNs: "/monitoring/tomorrow-appointments/",
  patientByid: (id) => `/monitoring/patients/${id}/`,
};
