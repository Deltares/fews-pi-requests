import { ArchiveAttributes } from "../../../src/response";
import "cross-fetch/polyfill";
import fetchMock from "fetch-mock";
import { DocumentFormat } from "../../../src/requestParameters/documentFormat";
import { PiArchiveWebserviceProvider } from "../../../src/piArchiveWebserviceProvider";
import { ProductAttributesFilter } from "../../../src/requestParameters/productAttributesFilter";

describe("archive/products/attributes", function () {
  afterAll(function () {
    fetchMock.restore();
  });

  it("posts product attributes when called", async function () {
    fetchMock.mock(
      (url, opts) => {
        return (
          opts &&
          opts.method === "POST" &&
          url.includes(
            "archive/products/attributes?documentFormat=PI_JSON&relativePath=path%2Fto%2Fmetadata.xml&attribute(key1)=value1&attribute(key2)=value2"
          )
        );
      },
      {
        status: 200,
        body: "Attributes were successfully updated.",
      }
    );

    const provider = new PiArchiveWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const filter: ProductAttributesFilter = {
      documentFormat: DocumentFormat.PI_JSON,
      relativePath: "path/to/metadata.xml",
      attribute: {
        key1: "value1",
        key2: "value2",
      },
    };

    const results: string = await provider.postProductAttributes(
      filter
    );
    expect(results).toStrictEqual("Attributes were successfully updated.");

    const calls = fetchMock.calls();
    expect(calls.length).toBe(1);
    expect(calls[0][1]?.method).toBe("POST");
  });
});
