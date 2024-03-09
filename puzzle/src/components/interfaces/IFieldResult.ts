export interface IFieldResult {
  setSentence(): void;
  getIndexFirstNotResolved(): number;
  setClickField(text: string): void;
  addBlocksFieldResult(count: number, width: number): void;
  shuffleArr(str: string): string[];
}
