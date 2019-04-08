const MATCH_NONCOMMENT = /^[^%\n]+/gm;
const MATCH_RULE = /^.*\(.*\)\./;
const MATCH_DATA = /data\(\"(.*)\"\)/;

export function getNonCommentLinesFromAsp(code: string): string[] {
  const nonCommentLines = code.match(MATCH_NONCOMMENT);

  return nonCommentLines.map(line => line.trim());
};

export function isValidAsp(lines: string[]): boolean {
  const valid =
    lines
      .map((line) => {
        const match = line.match(MATCH_RULE);
        const valid = match !== null;
        if (!valid) {
          console.debug(`${line} is not valid`);
        }
        return valid;
      })
      .reduce((prev, curr) => {
        return prev && curr;
      });
  return valid;
};

export function getDataUrlFromAsp(lines: string[]): string | null {
  const dataUrls =
    lines
      .map((line) => {
        const match = line.match(MATCH_DATA);
        if (match !== null) {
          return match[1];
        }
        return null;
      })
      .filter((dataUrl) => {
        return !!dataUrl;
      });

  if (dataUrls.length > 1) {
    throw Error('More than one data source specified');
  }

  if (dataUrls.length === 0) {
    throw Error('No data source specified');
  }

  return dataUrls[0];
};
