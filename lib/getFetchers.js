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

export const getWebInfo = async () => {
  try {
    const result = await fetcher(`${base.apiUrl}/webinfo`);
    return { info: result.data };
  } catch (error) {
    return { error };
  }
};

export const getMembers = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/members?${query}`);
    return { members: result.data, pagination: result.pagination };
  } catch (error) {
    return { error };
  }
};

export const getProduct = async (id) => {
  try {
    const result = await fetcher(`${base.apiUrl}/products/${id}`);
    return { product: result.data };
  } catch (error) {
    return { error };
  }
};

export const getProducts = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/products?${query}`);
    return { products: result.data, pagination: result.pagination };
  } catch (error) {
    return { error };
  }
};

export const getResearch = async (id) => {
  try {
    const result = await fetcher(`${base.apiUrl}/researchs/${id}`);

    return {
      research: result.data,
    };
  } catch (error) {
    return { error };
  }
};

export const getJob = async (id) => {
  try {
    const result = await fetcher(`${base.apiUrl}/experiences/${id}`);

    return {
      experience: result.data,
    };
  } catch (error) {
    return { error };
  }
};

export const getReward = async (id) => {
  try {
    const result = await fetcher(`${base.apiUrl}/rewards/${id}`);

    return {
      reward: result.data,
    };
  } catch (error) {
    return { error };
  }
};

export const getParticipation = async (id) => {
  try {
    const result = await fetcher(`${base.apiUrl}/participations/${id}`);

    return {
      participation: result.data,
    };
  } catch (error) {
    return { error };
  }
};

export const getMember = async (id) => {
  try {
    const result = await fetcher(`${base.apiUrl}/members/${id}`);
    return {
      member: result.data,
      alternativeMembers: result.alternativeMembers,
      ratingStats: result.ratingStats,
    };
  } catch (error) {
    return { error };
  }
};

export const getExperience = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/experiences?${query}`);
    console.log(result);
    return {
      experiences: result.data,
    };
  } catch (error) {
    return { error };
  }
};

export const getPartner = async (id) => {
  try {
    const result = await fetcher(`${base.apiUrl}/partners/${id}`);
    return {
      partner: result.data,
    };
  } catch (error) {
    return { error };
  }
};

export const getCourse = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/course?${query}`);
    return { courses: result.data, pagination: result.pagination };
  } catch (error) {
    return { error };
  }
};

export const getRateMembers = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/members/rate?${query}`);
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
    return { partners: result.data, pagination: result.pagination };
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

export const getMemberCategoriesSort = async () => {
  try {
    const result = await fetcher(`${base.apiUrl}/member-categories/sorter`);
    return { categories: result.data };
  } catch (error) {
    return { error };
  }
};

export const getExpertMembers = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/members/experts?${query}`);
    return { experts: result.data, pagination: result.pagination };
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
