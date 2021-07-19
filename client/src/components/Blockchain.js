import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";

const blockData = [
  { index: 0, previous_hash: "", timestamp: 0, transfers: [], proof: 100 },
  {
    index: 1,
    previous_hash:
      "fe08315845c6e1e2e223f05ed3de29a5db24c23f1a377e12180ebd0f50638399",
    timestamp: 1621582295.6771019,
    transfers: [
      {
        user: "30819f300d06092a864886f70d010101050003818d0030818902818100e6c58f279f0bcf040908c11f62cdd1daf46a3bb058244561e3c35704bba61e1e4d59cd951e8c70fe7643e5c0843ff81fd8bfaa368cb9a70a0010c9718c45b61a9daf1478b37b523d3ad8018d07861d33ba835763a961f169e5fd2090252132819d1dfe6ea5998db908e66aaa0bf9d0704518e67334e5dd99b076ab1e5b84fb090203010001",
        signature: "MINING",
        amount: 10,
      },
    ],
    proof: 756,
  },
  {
    index: 2,
    previous_hash:
      "561a442e9f6a0939c39e3175fc222a5ea351f2e02d8024aa60ccb54d0a9f13f2",
    timestamp: 1621582303.7484612,
    transfers: [
      {
        user: "30819f300d06092a864886f70d010101050003818d0030818902818100e6c58f279f0bcf040908c11f62cdd1daf46a3bb058244561e3c35704bba61e1e4d59cd951e8c70fe7643e5c0843ff81fd8bfaa368cb9a70a0010c9718c45b61a9daf1478b37b523d3ad8018d07861d33ba835763a961f169e5fd2090252132819d1dfe6ea5998db908e66aaa0bf9d0704518e67334e5dd99b076ab1e5b84fb090203010001",
        signature: "MINING",
        amount: 10,
      },
    ],
    proof: 22,
  },
  {
    index: 3,
    previous_hash:
      "f8f8111559a1216f63747e8c99c06a7895c719fd4380fc2166bbfa1c47af26b6",
    timestamp: 1621582328.7508035,
    transfers: [
      {
        user: "30819f300d06092a864886f70d010101050003818d0030818902818100e6c58f279f0bcf040908c11f62cdd1daf46a3bb058244561e3c35704bba61e1e4d59cd951e8c70fe7643e5c0843ff81fd8bfaa368cb9a70a0010c9718c45b61a9daf1478b37b523d3ad8018d07861d33ba835763a961f169e5fd2090252132819d1dfe6ea5998db908e66aaa0bf9d0704518e67334e5dd99b076ab1e5b84fb090203010001",
        signature: "MINING",
        amount: 10,
      },
    ],
    proof: 850,
  },
  {
    index: 4,
    previous_hash:
      "2eb74646b425a8e4f2172a9615c21fd6ccf8ee83389ed043ab3f9073715157b0",
    timestamp: 1621582461.816392,
    transfers: [
      {
        user: "30819f300d06092a864886f70d010101050003818d0030818902818100e6c58f279f0bcf040908c11f62cdd1daf46a3bb058244561e3c35704bba61e1e4d59cd951e8c70fe7643e5c0843ff81fd8bfaa368cb9a70a0010c9718c45b61a9daf1478b37b523d3ad8018d07861d33ba835763a961f169e5fd2090252132819d1dfe6ea5998db908e66aaa0bf9d0704518e67334e5dd99b076ab1e5b84fb090203010001",
        signature: "MINING",
        amount: 10,
      },
    ],
    proof: 219,
  },
  {
    index: 5,
    previous_hash:
      "007a8aec16e239b52d76447901c95dc7edd62c0add62d15f04cad3f91da3ffe8",
    timestamp: 1621583315.3686335,
    transfers: [
      {
        user: "30819f300d06092a864886f70d010101050003818d0030818902818100d673c01f28c39ba8abd1a19a5a6a07c205a01af95823534495705f6077694dbf71e018159c710de803911aa5e84d7fcc96a407581455fa75ffd644dacfb3ade7fc10f04d7fdbbfe30bf2e02fbabb877e9b844831b9f792bcd39bf773c01ec495ed03460916235eb34e4143606c98b6c5ca617a1cd43991c189d692d2b8132b5b0203010001",
        signature: "MINING",
        amount: 10,
      },
    ],
    proof: 114,
  },
  {
    index: 6,
    previous_hash:
      "7b7eb77fa973f1ad1cb45f8534283e944c9ec64b732cf78c7ccfc020e46babf3",
    timestamp: 1621583316.9302187,
    transfers: [
      {
        user: "30819f300d06092a864886f70d010101050003818d0030818902818100d673c01f28c39ba8abd1a19a5a6a07c205a01af95823534495705f6077694dbf71e018159c710de803911aa5e84d7fcc96a407581455fa75ffd644dacfb3ade7fc10f04d7fdbbfe30bf2e02fbabb877e9b844831b9f792bcd39bf773c01ec495ed03460916235eb34e4143606c98b6c5ca617a1cd43991c189d692d2b8132b5b0203010001",
        signature: "MINING",
        amount: 10,
      },
    ],
    proof: 79,
  },
  {
    index: 7,
    previous_hash:
      "decbe994efd2c787db49412a7030376db21da60e0d31c1cc1bd8eb0c10d4d4ad",
    timestamp: 1621583318.4247425,
    transfers: [
      {
        user: "30819f300d06092a864886f70d010101050003818d0030818902818100d673c01f28c39ba8abd1a19a5a6a07c205a01af95823534495705f6077694dbf71e018159c710de803911aa5e84d7fcc96a407581455fa75ffd644dacfb3ade7fc10f04d7fdbbfe30bf2e02fbabb877e9b844831b9f792bcd39bf773c01ec495ed03460916235eb34e4143606c98b6c5ca617a1cd43991c189d692d2b8132b5b0203010001",
        signature: "MINING",
        amount: 10,
      },
    ],
    proof: 162,
  },
  {
    index: 8,
    previous_hash:
      "eeb11410b4a973895d4a34a8b4d5e5ea2c2fbcd587b00419929d09ff073dc008",
    timestamp: 1621585398.6735668,
    transfers: [
      {
        user: "abcd",
        signature:
          "7281aaf08d8c0a1dcf050541034f842946276a5bcc426b2a8021f2d76a5e973d55e62e4a46000c4153011f976319f637bdc14f6e515a10d208c772e5d42bdf415e249ec973034de833c9129e38afa180c8d5f3f6d2d65e33241d97dc3ffe8df4a9c32cace9b08c4115b25c0a3cb407f054dd341438ff1889faa181f1310334c3",
        amount: 20,
      },
      {
        user: "abcd",
        signature:
          "7281aaf08d8c0a1dcf050541034f842946276a5bcc426b2a8021f2d76a5e973d55e62e4a46000c4153011f976319f637bdc14f6e515a10d208c772e5d42bdf415e249ec973034de833c9129e38afa180c8d5f3f6d2d65e33241d97dc3ffe8df4a9c32cace9b08c4115b25c0a3cb407f054dd341438ff1889faa181f1310334c3",
        amount: 20,
      },
      {
        user: "abcd",
        signature:
          "7281aaf08d8c0a1dcf050541034f842946276a5bcc426b2a8021f2d76a5e973d55e62e4a46000c4153011f976319f637bdc14f6e515a10d208c772e5d42bdf415e249ec973034de833c9129e38afa180c8d5f3f6d2d65e33241d97dc3ffe8df4a9c32cace9b08c4115b25c0a3cb407f054dd341438ff1889faa181f1310334c3",
        amount: 20,
      },
      {
        user: "abcd",
        signature:
          "cec84155b984b9536e8b9efbb5a664e6aaf1986687a1ef79ad1b5a08cd8ded66d6363d74fe760abad0388dc79cba83c0b94a7e15993b7a49a70dee7658f2c86943ffcd776d4501947b0a8231e629b0b64c144dca56b86026e7719a853e1be7f6bad414a7a1f4c97a6342e8e828e464f8298d569ac9ebf2e151420467251661c2",
        amount: 20.0,
      },
      {
        user: "abcd",
        signature:
          "7281aaf08d8c0a1dcf050541034f842946276a5bcc426b2a8021f2d76a5e973d55e62e4a46000c4153011f976319f637bdc14f6e515a10d208c772e5d42bdf415e249ec973034de833c9129e38afa180c8d5f3f6d2d65e33241d97dc3ffe8df4a9c32cace9b08c4115b25c0a3cb407f054dd341438ff1889faa181f1310334c3",
        amount: 20,
      },
      {
        user: "abcd",
        signature:
          "cec84155b984b9536e8b9efbb5a664e6aaf1986687a1ef79ad1b5a08cd8ded66d6363d74fe760abad0388dc79cba83c0b94a7e15993b7a49a70dee7658f2c86943ffcd776d4501947b0a8231e629b0b64c144dca56b86026e7719a853e1be7f6bad414a7a1f4c97a6342e8e828e464f8298d569ac9ebf2e151420467251661c2",
        amount: 20.0,
      },
      {
        user: "abcd",
        signature:
          "7281aaf08d8c0a1dcf050541034f842946276a5bcc426b2a8021f2d76a5e973d55e62e4a46000c4153011f976319f637bdc14f6e515a10d208c772e5d42bdf415e249ec973034de833c9129e38afa180c8d5f3f6d2d65e33241d97dc3ffe8df4a9c32cace9b08c4115b25c0a3cb407f054dd341438ff1889faa181f1310334c3",
        amount: 20,
      },
      {
        user: "abcd",
        signature:
          "7281aaf08d8c0a1dcf050541034f842946276a5bcc426b2a8021f2d76a5e973d55e62e4a46000c4153011f976319f637bdc14f6e515a10d208c772e5d42bdf415e249ec973034de833c9129e38afa180c8d5f3f6d2d65e33241d97dc3ffe8df4a9c32cace9b08c4115b25c0a3cb407f054dd341438ff1889faa181f1310334c3",
        amount: 20,
      },
      {
        user: "abcd",
        signature:
          "7281aaf08d8c0a1dcf050541034f842946276a5bcc426b2a8021f2d76a5e973d55e62e4a46000c4153011f976319f637bdc14f6e515a10d208c772e5d42bdf415e249ec973034de833c9129e38afa180c8d5f3f6d2d65e33241d97dc3ffe8df4a9c32cace9b08c4115b25c0a3cb407f054dd341438ff1889faa181f1310334c3",
        amount: 20,
      },
      {
        user: "30819f300d06092a864886f70d010101050003818d0030818902818100d673c01f28c39ba8abd1a19a5a6a07c205a01af95823534495705f6077694dbf71e018159c710de803911aa5e84d7fcc96a407581455fa75ffd644dacfb3ade7fc10f04d7fdbbfe30bf2e02fbabb877e9b844831b9f792bcd39bf773c01ec495ed03460916235eb34e4143606c98b6c5ca617a1cd43991c189d692d2b8132b5b0203010001",
        signature:
          "379eabf8f6b794ce8bc02b0f51844d60ac8516dfeda382478bdd532fd118cf6cd7e1fb65a7917f7b8707fbf51d405100568d2197f3e84e50c1ebb0d4f45907a3ec0a20e91c200d0321316e45b8e0154aaa98ebead2362f3adc5ac564c611aebf72c500805449eeea2cb29570bf65c8be32e6464136af4d1fc13f426f4a58f4a5",
        amount: 20,
      },
      {
        user: "30819f300d06092a864886f70d010101050003818d0030818902818100d673c01f28c39ba8abd1a19a5a6a07c205a01af95823534495705f6077694dbf71e018159c710de803911aa5e84d7fcc96a407581455fa75ffd644dacfb3ade7fc10f04d7fdbbfe30bf2e02fbabb877e9b844831b9f792bcd39bf773c01ec495ed03460916235eb34e4143606c98b6c5ca617a1cd43991c189d692d2b8132b5b0203010001",
        signature:
          "37264606f4d525dda860a2417e1c0da52adea48d54b2ad26ca398dedb0f2334f5d4c5e5082dacd173a0c622f91c737598360cc251779bc24888de06754b4bc90dfa39f6bc3de3d5ac5161aaf9995a8c6c92bba7b93c26bc6afaea0bdeceead48bf9d3e03bd75a3c23d59e27acc647f248a1ca080acb4bf81a29ffdce8b30be83",
        amount: 200,
      },
      {
        user: "30819f300d06092a864886f70d010101050003818d0030818902818100d673c01f28c39ba8abd1a19a5a6a07c205a01af95823534495705f6077694dbf71e018159c710de803911aa5e84d7fcc96a407581455fa75ffd644dacfb3ade7fc10f04d7fdbbfe30bf2e02fbabb877e9b844831b9f792bcd39bf773c01ec495ed03460916235eb34e4143606c98b6c5ca617a1cd43991c189d692d2b8132b5b0203010001",
        signature: "MINING",
        amount: 10,
      },
    ],
    proof: 418,
  },
  {
    index: 9,
    previous_hash:
      "c89dac032666982bf479ac3e97654d3ff282040faf5efd63b332466972855992",
    timestamp: 1621585439.7712524,
    transfers: [
      {
        user: "30819f300d06092a864886f70d010101050003818d0030818902818100d673c01f28c39ba8abd1a19a5a6a07c205a01af95823534495705f6077694dbf71e018159c710de803911aa5e84d7fcc96a407581455fa75ffd644dacfb3ade7fc10f04d7fdbbfe30bf2e02fbabb877e9b844831b9f792bcd39bf773c01ec495ed03460916235eb34e4143606c98b6c5ca617a1cd43991c189d692d2b8132b5b0203010001",
        signature:
          "5def5914435c6a42e76c8926d6bbee6e3faf398a897c50366a6c137ba7b9f878967666af8d9a268a35beb7574058e82b881b76964b0a4dd579958061afedbfaa55e836e384df3ecd07d0fca42034632493360e5e13603587bb35ba0bed952b9848788d752e58430441e557db04b21e3b4e92f3e5170d5e0c7b61fabf2505d0af",
        amount: -20,
      },
      {
        user: "30819f300d06092a864886f70d010101050003818d0030818902818100d673c01f28c39ba8abd1a19a5a6a07c205a01af95823534495705f6077694dbf71e018159c710de803911aa5e84d7fcc96a407581455fa75ffd644dacfb3ade7fc10f04d7fdbbfe30bf2e02fbabb877e9b844831b9f792bcd39bf773c01ec495ed03460916235eb34e4143606c98b6c5ca617a1cd43991c189d692d2b8132b5b0203010001",
        signature: "MINING",
        amount: 10,
      },
    ],
    proof: 102,
  },
  {
    index: 10,
    previous_hash:
      "47dc6f41dba3529a0bfe4d8e3dd0947c02ea1f64fb15ea73577596532bf59f2f",
    timestamp: 1621585957.3907123,
    transfers: [
      {
        user: "30819f300d06092a864886f70d010101050003818d0030818902818100d673c01f28c39ba8abd1a19a5a6a07c205a01af95823534495705f6077694dbf71e018159c710de803911aa5e84d7fcc96a407581455fa75ffd644dacfb3ade7fc10f04d7fdbbfe30bf2e02fbabb877e9b844831b9f792bcd39bf773c01ec495ed03460916235eb34e4143606c98b6c5ca617a1cd43991c189d692d2b8132b5b0203010001",
        signature:
          "5def5914435c6a42e76c8926d6bbee6e3faf398a897c50366a6c137ba7b9f878967666af8d9a268a35beb7574058e82b881b76964b0a4dd579958061afedbfaa55e836e384df3ecd07d0fca42034632493360e5e13603587bb35ba0bed952b9848788d752e58430441e557db04b21e3b4e92f3e5170d5e0c7b61fabf2505d0af",
        amount: -20,
      },
      {
        user: "abcd",
        signature:
          "7281aaf08d8c0a1dcf050541034f842946276a5bcc426b2a8021f2d76a5e973d55e62e4a46000c4153011f976319f637bdc14f6e515a10d208c772e5d42bdf415e249ec973034de833c9129e38afa180c8d5f3f6d2d65e33241d97dc3ffe8df4a9c32cace9b08c4115b25c0a3cb407f054dd341438ff1889faa181f1310334c3",
        amount: 20,
      },
      {
        user: "30819f300d06092a864886f70d010101050003818d0030818902818100d673c01f28c39ba8abd1a19a5a6a07c205a01af95823534495705f6077694dbf71e018159c710de803911aa5e84d7fcc96a407581455fa75ffd644dacfb3ade7fc10f04d7fdbbfe30bf2e02fbabb877e9b844831b9f792bcd39bf773c01ec495ed03460916235eb34e4143606c98b6c5ca617a1cd43991c189d692d2b8132b5b0203010001",
        signature:
          "8c0db19cbf1c3999f73d876d75c3e0fb28f2f711a1471fc4ce3221c5042b113bd8f750d72a126d052b75dc0f9f14b05054f3043db1898a1fa338b2bf6cc564d07e62086a6ae19093ffc51865b8a931e8949693b40aefcf7150c05c1a9e9d897c662943d62cc6b8b5b026788e0b1be4f5229263e428fe536d8b6bda136632f20b",
        amount: -150,
      },
      {
        user: "abcd",
        signature:
          "d643c0d36587edc04ddfda85caa9e490e8bb847a8aa825b288eb7a8b1afa2cef3d134a9ca67aac01c74ce98b8f3ad659d1b50c25ac47f5519447797e6244530011a02ddcbf24221b865db6df4bc788070d48db0ceca5db0bbb4ca0b53f7c5aad3cad08f1beeb08f918e576e478eb9461f02d68f892ab8ba0df16cf8482b7e02a",
        amount: 150,
      },
      {
        user: "30819f300d06092a864886f70d010101050003818d0030818902818100d673c01f28c39ba8abd1a19a5a6a07c205a01af95823534495705f6077694dbf71e018159c710de803911aa5e84d7fcc96a407581455fa75ffd644dacfb3ade7fc10f04d7fdbbfe30bf2e02fbabb877e9b844831b9f792bcd39bf773c01ec495ed03460916235eb34e4143606c98b6c5ca617a1cd43991c189d692d2b8132b5b0203010001",
        signature: "MINING",
        amount: 10,
      },
    ],
    proof: 325,
  },
  {
    index: 11,
    previous_hash:
      "2737b6285b42d5564ac1300c3b24a5880df121fbb14ac82ed289cc094c5573aa",
    timestamp: 1621586250.3328419,
    transfers: [
      {
        user: "30819f300d06092a864886f70d010101050003818d0030818902818100d673c01f28c39ba8abd1a19a5a6a07c205a01af95823534495705f6077694dbf71e018159c710de803911aa5e84d7fcc96a407581455fa75ffd644dacfb3ade7fc10f04d7fdbbfe30bf2e02fbabb877e9b844831b9f792bcd39bf773c01ec495ed03460916235eb34e4143606c98b6c5ca617a1cd43991c189d692d2b8132b5b0203010001",
        signature: "MINING",
        amount: 10,
      },
    ],
    proof: 116,
  },
  {
    index: 12,
    previous_hash:
      "86c778fbb81ab47a8414dab1773f40379749020b1ebc6b0904bab77dd06681b7",
    timestamp: 1621589582.0833302,
    transfers: [
      {
        user: "30819f300d06092a864886f70d010101050003818d0030818902818100d673c01f28c39ba8abd1a19a5a6a07c205a01af95823534495705f6077694dbf71e018159c710de803911aa5e84d7fcc96a407581455fa75ffd644dacfb3ade7fc10f04d7fdbbfe30bf2e02fbabb877e9b844831b9f792bcd39bf773c01ec495ed03460916235eb34e4143606c98b6c5ca617a1cd43991c189d692d2b8132b5b0203010001",
        signature:
          "36a91c58ee45b84315211d6bcbd145401be99f5cea22fab5e6b25e8bed980b294fbc5b2fa51c0084317e651858f7a19cd2df727b2a5a427d74a21fbf5b0c2baff8c7e0e9b95118d929322f1f8ba7191ed8d9f0e4845bf634d077baa081c8f379ae14af3a446d97f1e043c6cd780d95f751140ac584da687ab1a08227099b0912",
        amount: -1,
      },
      {
        user: "abcd",
        signature:
          "822233d48a5833272350eaee6a0638bc7b3f1747366b43ef2dd01de6dcd56a4d810fc64ba441c5966ba8fac29ce50d9dd43821318514649628556fcb4b713e5a8284fb3ff4fe6eba6d6feed18450dbc54781a7edbe5b3865c9a7cdde3070ff2f21dfb293adfa1dc0b50500a8482b4bd469eb38091a74f673a493fd2b51d8ed91",
        amount: 1,
      },
      {
        user: "30819f300d06092a864886f70d010101050003818d0030818902818100b01e8039cd297d61a0a2cddb2b95f06b5db689fc9d4d9f424307a78764e795244e431845c1e64da4f5f9afce4e52a911cd293dd17f5c5ad61cf7cefb1ebef7c27877a86665572869e9e0706870c5cb2e1ca591f83eb728c8e28364aea2e4ae0d43bf68734a0f3794c6481ec1b1f800dab90fb14b24f1ef656dc055995fe57b8d0203010001",
        signature: "MINING",
        amount: 10,
      },
    ],
    proof: 46,
  },
  {
    index: 13,
    previous_hash:
      "2c13b5e8617bce9da7960ee4aad6886e2b3ebb5683a6a1ff694ee6072e484938",
    timestamp: 1621589606.1753879,
    transfers: [
      {
        user: "30819f300d06092a864886f70d010101050003818d0030818902818100b01e8039cd297d61a0a2cddb2b95f06b5db689fc9d4d9f424307a78764e795244e431845c1e64da4f5f9afce4e52a911cd293dd17f5c5ad61cf7cefb1ebef7c27877a86665572869e9e0706870c5cb2e1ca591f83eb728c8e28364aea2e4ae0d43bf68734a0f3794c6481ec1b1f800dab90fb14b24f1ef656dc055995fe57b8d0203010001",
        signature:
          "4d981d46c887967a30d34cf81bbbe9a585f2b2de7432ae1fffb67aba30d1a2b8205d5ca17515ab3b735ed969319fc1e0a920880bd1a0d0cf4271a07466fc11f5bf99c4bb478641830fec391b0df7bbf48737571d4a8c4b6bced96dbfb73449c2e5ccc3bafd1f6e2274030951e33298453da4a6c82ec285f44c20b33cbf6b9b57",
        amount: -2,
      },
      {
        user: "30819f300d06092a864886f70d010101050003818d0030818902818100d673c01f28c39ba8abd1a19a5a6a07c205a01af95823534495705f6077694dbf71e018159c710de803911aa5e84d7fcc96a407581455fa75ffd644dacfb3ade7fc10f04d7fdbbfe30bf2e02fbabb877e9b844831b9f792bcd39bf773c01ec495ed03460916235eb34e4143606c98b6c5ca617a1cd43991c189d692d2b8132b5b0203010001",
        signature:
          "5462c6a422e54b073b4fb21ff4cf609deac8951901e327a3d3a4fc733038e7c2d29d52f67f9c32312119dc930729d3235f61685df521365c745f1075adef8bbaed214e152333cb3ddb3414148864f058bb9a2ded9849500a7787c710b17083a7415451705375571c3977570de98eb56456592d403217f401c2e8dea158d38370",
        amount: 2,
      },
      {
        user: "30819f300d06092a864886f70d010101050003818d0030818902818100b01e8039cd297d61a0a2cddb2b95f06b5db689fc9d4d9f424307a78764e795244e431845c1e64da4f5f9afce4e52a911cd293dd17f5c5ad61cf7cefb1ebef7c27877a86665572869e9e0706870c5cb2e1ca591f83eb728c8e28364aea2e4ae0d43bf68734a0f3794c6481ec1b1f800dab90fb14b24f1ef656dc055995fe57b8d0203010001",
        signature: "MINING",
        amount: 10,
      },
    ],
    proof: 89,
  },
  {
    index: 14,
    previous_hash:
      "fc64fc48766a4721c0a9a4fb0d0dd7dfb440c104ee21444371147aba919faf67",
    timestamp: 1626627408.6027374,
    transfers: [
      {
        user: "30819f300d06092a864886f70d010101050003818d00308189028181009fb06824ef874669989e5a2d53435dec386f5579aca8bcdc0d14d612120adbc3717fb026b51799e278178755c0f22bf1abff89555b19b1f717f40782b9f60680a3625509dbdbeb16cee39a4d897fb0eb800ea2801fb4a6e382237f110d4096df9ade4a52494116f74597bb486c0b2f68316f257bfc6fb77b09778cad781609ef0203010001",
        signature: "MINING",
        amount: 10,
      },
    ],
    proof: 6,
  },
  {
    index: 15,
    previous_hash:
      "e7dc219aa27b5499f2da08cf0389b69c19f529c7c9250dab179ca9c3dfebcdb1",
    timestamp: 1626627431.5604682,
    transfers: [
      {
        user: "30819f300d06092a864886f70d010101050003818d00308189028181009fb06824ef874669989e5a2d53435dec386f5579aca8bcdc0d14d612120adbc3717fb026b51799e278178755c0f22bf1abff89555b19b1f717f40782b9f60680a3625509dbdbeb16cee39a4d897fb0eb800ea2801fb4a6e382237f110d4096df9ade4a52494116f74597bb486c0b2f68316f257bfc6fb77b09778cad781609ef0203010001",
        signature: "MINING",
        amount: 10,
      },
    ],
    proof: 452,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    margin: "0 auto",
    padding: "10px",
    position: "relative",
    width: "80%",
    overflow: "hidden",
  },
  header: { marginBottom: 10 },
  title: {
    backgroundColor: "cyan",
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Blockchain = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {blockData.map((data) => (
        <Accordion className={classes.header}>
          <AccordionSummary
            className={classes.title}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              Block #{data.index}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              <Typography>
                <b>Creation Date/Time </b>:
                {new Date(data.timestamp).toLocaleString()}
                <br />
                <b>Previous Hash </b>: {data.previous_hash}
                <br />
                <b>Transfers</b>:
                <br />
                {data.transfers.map((t) => (
                  <div
                    style={{
                      backgroundColor: t.amount > 0 ? "#70e000" : "#f52900",
                      padding: 8,
                      marginBottom: 10,
                    }}
                  >
                    User: {t.user}
                    <br />
                    Amount = <b>{t.amount}</b>
                  </div>
                ))}
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Blockchain;