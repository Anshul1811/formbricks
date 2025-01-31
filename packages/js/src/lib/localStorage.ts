import type { TResponseData } from "../../../types/v1/responses";

export const storeResponse = (surveyId: string, answer: TResponseData) => {
  const storedResponse = localStorage.getItem(`formbricks-${surveyId}-responses`);
  if (storedResponse) {
    const parsedAnswers = JSON.parse(storedResponse);
    localStorage.setItem(`formbricks-${surveyId}-responses`, JSON.stringify({ ...parsedAnswers, ...answer }));
  } else {
    localStorage.setItem(`formbricks-${surveyId}-responses`, JSON.stringify(answer));
  }
};

export const getStoredResponse = (surveyId: string, questionId: string): string | null => {
  const storedResponse = localStorage.getItem(`formbricks-${surveyId}-responses`);
  if (storedResponse) {
    const parsedAnswers = JSON.parse(storedResponse);
    return parsedAnswers[questionId] || null;
  }
  return null;
};

export const clearStoredResponse = (surveyId: string) => {
  localStorage.removeItem(`formbricks-${surveyId}-responses`);
};
