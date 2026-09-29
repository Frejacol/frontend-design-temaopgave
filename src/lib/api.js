function apiFetch(url, options = {}) {
  return fetch(url, options).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });
}

export function getCaseStudies() {
  return apiFetch("https://ftk-api.pages.dev/case-studies");
}

export function getTeamMembers() {
  return apiFetch("https://ftk-api.pages.dev/team");
}

export function getFAQ() {
  return apiFetch("https://ftk-api.pages.dev/faq");
}

export function getFinancialProjections() {
  return apiFetch("https://ftk-api.pages.dev/financial-projections");
}

export function getExperience() {
  return apiFetch("https://ftk-api.pages.dev/experience");
}

export function getCoreValues() {
  return apiFetch("https://ftk-api.pages.dev/core-values");
}
