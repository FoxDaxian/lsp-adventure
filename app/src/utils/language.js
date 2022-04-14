/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { editor } from 'monaco-editor-core';

// interface ILang extends languages.ILanguageExtensionPoint {
// 	loader: () => Promise<ILangImpl>;
// }

// interface ILangImpl {
// 	conf: languages.LanguageConfiguration;
// 	language: languages.IMonarchLanguage;
// }

const languageDefinitions = {};
const lazyLanguageLoaders = {};


export async function loadLanguage(languageId) {
    await LazyLanguageLoader.getOrCreate(languageId).load();

    // trigger tokenizer creation by instantiating a model
    const model = editor.createModel('', languageId);
    model.dispose();
}

export function registerLanguage(def) {
    console.log(def);
    //     const languageId = def.id;

    //     languageDefinitions[languageId] = def;
    //     languages.register(def);

    //     const lazyLanguageLoader = LazyLanguageLoader.getOrCreate(languageId);
    //     languages.registerTokensProviderFactory(languageId, {
    //         create: async () => {
    //             const mod = await lazyLanguageLoader.load();
    //             return mod.language;
    //         },
    //     });
    //     languages.onLanguage(languageId, async () => {
    //         const mod = await lazyLanguageLoader.load();
    //         languages.setLanguageConfiguration(languageId, mod.conf);
    //     });
}
