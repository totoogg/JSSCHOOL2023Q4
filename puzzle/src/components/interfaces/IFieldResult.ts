export interface IFieldResult {
  setSentence(level: number, rounds: number, currentWords: number): void;
  getIndexFirstNotResolved(): number;
  setClickField(text: string): void;
  addBlocksFieldResult(count: number, width: number): void;
  shuffleArr(str: string): string[];
  setAttributeResult(
    level: number,
    rounds: number,
    currentWords: number,
    countRounds: number,
  ): void;
  addClassItemClick(): void;
  addBackgroundResult(): void;
  addBackgroundClickBlock(): void;
}
