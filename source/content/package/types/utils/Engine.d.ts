import type sizeFormat from "../interfaces/sizeFormat";
import type EngineOutput from "../interfaces/EngineOutput";
export declare const getLocatedPaths: () => Promise<any>;
export declare var sizeFormat: sizeFormat;
export default function Engine({ query, useTor, verbose }: {
    query: any;
    useTor?: boolean | undefined;
    verbose?: boolean | undefined;
}): Promise<EngineOutput | null>;
//# sourceMappingURL=Engine.d.ts.map