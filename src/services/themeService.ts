import * as themeRepository from "../repositories/themeRepository.js";

export async function getAll() {
    const themes = await themeRepository.getAll();

    return themes;
}
