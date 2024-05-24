import type sizeFormat from "../interfaces/sizeFormat";
import type EngineOutput from "../interfaces/EngineOutput";
export declare var sizeFormat: sizeFormat;
export default function Engine({ sudo, query, useTor, ipAddress, }: {
    query: string;
    sudo?: boolean;
    useTor?: boolean;
    ipAddress: string;
}): Promise<EngineOutput>;
//# sourceMappingURL=Engine.d.ts.map