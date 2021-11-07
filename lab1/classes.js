export class Input {
    constructor(K, Sums, Muls) {
        this.K = K
        this.Sums = Sums
        this.Muls = Muls
    }
}

export class Output {
    constructor(SumResult, MulResult, SortedInputs) {
        this.SumResult = SumResult
        this.MulResult = MulResult
        this.SortedInputs = SortedInputs
    }
}