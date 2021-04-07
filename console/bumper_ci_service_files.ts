export interface IFile {
  filename: string;
  replaceTheRegex: RegExp;
  replaceWith: string;
}

export const regexes = {
  const_statements: /version = ".+"/g,
  egg_json: /"version": ".+"/,
  import_export_statements: /moogle@v[0-9\.]+[0-9\.]+[0-9\.]/g,
  import_export_statements_without_v: /moogle@v[0-9\.]+[0-9\.]+[0-9\.]/g,
  yml_deno: /deno: \[".+"\]/g,
};

export const preReleaseFiles: IFile[] = [
  {
    filename: "./egg.json",
    replaceTheRegex: regexes.egg_json,
    replaceWith: `"version": "{{ thisModulesLatestVersion }}"`,
  },
  {
    filename: "./README.md",
    replaceTheRegex: regexes.import_export_statements,
    replaceWith: `moogle@v{{ thisModulesLatestVersion }}`,
  },
  {
    filename: "./README.md",
    replaceTheRegex: regexes.import_export_statements_without_v,
    replaceWith: `moogle@{{ thisModulesLatestVersion }}`,
  },
  {
    filename: "./package.json",
    replaceTheRegex: regexes.egg_json,
    replaceWith: `"version": "{{ thisModulesLatestVersion }}"`,
  },
];
