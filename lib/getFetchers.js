import fetcher from "fetcher";
import base from "./base";
export const revalidate = 60;

export const getSocialLinks = async () => {
  try {
    const result = await fetcher(`${base.apiUrl}/slinks`);
    return { socials: result.data };
  } catch (error) {
    return { error };
  }
};

export const getTeams = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/members?${query}`);
    return { members: result.data };
  } catch (error) {
    return { error };
  }
};

export const getNews = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/news?${query}`);

    return { news: result.data, pagination: result.pagination };
  } catch (error) {
    return { error };
  }
};

export const getPartners = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/partners?${query}`);
    return { partners: result.data };
  } catch (error) {
    return { error };
  }
};

export const getNewsCategories = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/news-categories?${query}`);
    return { newsCategories: result.data };
  } catch (error) {
    return { error };
  }
};

export const getMemberCategories = async () => {
  try {
    const result = await fetcher(`${base.apiUrl}/member-categories`);
    return { categories: result.data };
  } catch (error) {
    return { error };
  }
};

export const getIdNews = async (id) => {
  try {
    const result = await fetcher(`${base.apiUrl}/news/${id}`);
    return { news: result.data };
  } catch (error) {
    return { error };
  }
};