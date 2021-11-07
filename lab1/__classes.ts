interface InputInterface {
    K: number
    Sums: Array<number>
    Muls: Array<number>
}

export class Input implements InputInterface {
    public K: number
    public Sums: Array<number>
    public Muls: Array<number>

    constructor(K, Sums, Muls) {
        this.K = K
        this.Sums = Sums
        this.Muls = Muls
    }
}


interface OutputInterface {
    SumResult: number
    MulResult: Array<number>
    SortedInputs: Array<number>
}

export class Output implements OutputInterface {
    public SumResult: number
    public MulResult: Array<number>
    public SortedInputs: Array<number>

    constructor(SumResult, MulResult, SortedInputs) {
        this.SumResult = SumResult
        this.MulResult = MulResult
        this.SortedInputs = SortedInputs
    }
}