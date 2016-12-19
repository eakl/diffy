'use strict'

const oldArray = [
  "54f088efc7a9b9461467c8ea",
  "54f3d4d80055ba9c26e4ea5a",
  "54f3d57d0055ba9c26e4ea5d",
  "54f3df5b0055ba9c26e4ea7e",
  "54f3e2b50055ba9c26e4eac7",
  "54f3e7f30055ba9c26e4eb87",
  "54f42bf60055ba9c26e4ecb4",
  "54f535b65a543d7140d393a6",
  "55c74ba5d42b733721bccc0c",
  "54f831f8b562d314421e83b1",
  "54f833acb562d314421e83d0",
  "54f83952b562d314421e840f",
  "550c0423ea40cb737b8c8063",
  "550c04b2ea40cb737b8c8068",
  "550c051fea40cb737b8c806a",
  "550c0580ea40cb737b8c807c",
  "550c060bea40cb737b8c808d",
  "550d2025ea40cb737b8c80be",
  "550d3f19ea40cb737b8c80df",
  "550e66f4ea40cb737b8c8126",
  "550f8b99ea40cb737b8c812c",
  "550f9631ea40cb737b8c8142",
  "550f967aea40cb737b8c8143",
  "550f986eea40cb737b8c8144",
  "55113a1eea40cb737b8c816c",
  "55139002ea40cb737b8c819b",
  "551408f1ea40cb737b8c81c8",
  "55152b2dea40cb737b8c835d",
  "55152d85ea40cb737b8c836e",
  "551c2a48ea40cb737b8c83e7",
  "5527a42a8cd122d444033cca",
  "552b16ba2d90e1ee5fcf3029",
  "552b4d6c2d90e1ee5fcf3031",
  "552f6cdffc3daca91b3d2df6",
  "5539f9ec90cd11950266d381",
  "553b990990cd11950266d41f",
  "5545214d90cd11950266d47d",
  "5549f1b590cd11950266d48f",
  "5550eed390cd11950266d49e",
  "5551878890cd11950266d4a1",
  "5551961d90cd11950266d4a3",
  "555196ef90cd11950266d4a4",
  "555491a66727676e47e5d83c",
  "5559ba1f6727676e47e5d85b",
  "5559c5206727676e47e5d85e",
  "5566acf50e6f48904125c528",
  "5566c51fb6ede2da4f59ae18",
  "5567cf05870e405f53cdc5a8",
  "556d873c34347e0f4a6c6200",
  "55700dc343e1cfc97d347bc7",
  "557013a543e1cfc97d347bd0",
  "55701e0d10fddb450294f385",
  "5571144d10fddb450294f3da",
  "55750fcd88ea84483a845850",
  "5575230e88ea84483a8458db",
  "557b8fbe916f470645130241",
  "54f09b89c7a9b9461467c8f6",
  "557e6602916f470645130440",
  "557e9f4b844646b31445653f",
  "558280cb9ad30c4669735ed1",
  "55892ca3d6a0f26e275ac5b6",
  "558944b5d6a0f26e275ac5f4",
  "5590d8f3e07653ca477c2202",
  "5594e8e33c82a58e1c02d3e9",
  "5593abc5797dd7c70959a76f",
  "55962bfc48d3d3e246ffa6d9",
  "559632c748d3d3e246ffa759",
  "559638e148d3d3e246ffa792",
  "559e412587ef3bf7132d65fc",
  "55a37b80fcdc35870595e443",
  "55a406aefcdc35870595e63e",
  "5567c927870e405f53cdc5a5",
  "55a66279b9424db226b8d3bc",
  "55a72856db19cfc344860e49",
  "55bcc2661733f14d6cbf4ba3",
  "55be584b1733f14d6cbf4e9b",
  "55beada91733f14d6cbf4ebe",
  "55beb8301733f14d6cbf4ecf",
  "55beec591733f14d6cbf5040",
  "55bef1501733f14d6cbf5073",
  "55bf1f606b19c4d20c518301",
  "55bf2dc1195d94dc0e109c99",
  "55c04b91195d94dc0e10a61d",
  "55c885fd699dc8ef048fe831",
  "55c96149699dc8ef048fe910",
  "55b222bc55f014c6748334b1",
  "55d16e0a8d643e7732892e83",
  "55d1705d8d643e7732892eff",
  "55d171478d643e7732892f1f",
  "55d59e755f1119616d55183f",
  "55d5e02d5f1119616d551c8b",
  "55d68bdc5f1119616d551d62",
  "55966e0c48d3d3e246ffa891",
  "5594ea0b3c82a58e1c02d3fd",
  "55dbda6eda7045ae3263cd64",
  "55dbdc22da7045ae3263cd6e",
  "55de98328dcf5de6631b4d98",
  "55deeb4cb1cdccc366ac92c4",
  "55e5432c2358b8bf1d54ad7a",
  "55ac9ebe424136a502b59dd6",
  "55c037e2195d94dc0e10a416",
  "55e92090602bc21918a29f7e",
  "55f001e6d697fd846e0ea9d2",
  "55f68662446501445f97d79c",
  "55f7f194b971644d7d86001f",
  "55f937e60c3bc5b85e1897a5",
  "55f8f041b971644d7d861502",
  "55fa53c134fb7538797d5080",
  "55fa53c134fb7538797d509a",
  "5602347ac868446663e67d8e",
  "5612140b5e44e0634efab8f1",
  "5614d74b5988e00f11db53dc",
  "561b382c18d0a2c74d9c7184",
  "5630a8023bf03108592266f7",
  "5630a8663bf0310859226746",
  "55e6db5ba856461404a5f3f0",
  "5630a8b43bf0310859226790",
  "5630a8e53bf03108592267c0",
  "5630a98b3bf0310859226883",
  "5630a9a53bf03108592268b8",
  "5630aa493bf0310859226904",
  "5631e4b33bf0310859229a3e",
  "55e59ec2b68cdc1411955142",
  "563700b452f4b32b5137e643",
  "56370ce352f4b32b5137e962",
  "5637257652f4b32b5137f0df",
  "563731c852f4b32b5137f46f",
  "563831c925c42f3b78494373",
  "563838f325c42f3b784946c7",
  "563707c752f4b32b5137e7fa",
  "5604124e0083297b6b4dc14c",
  "56401e08d6f47ae719be997e",
  "563843a625c42f3b78494b3f",
  "5652900f9f47780e5b5e3228",
  "560a6d74b534c68f2eb62308",
  "567baafc7a49015411a657fd",
  "56668d718d28560e770e685f",
  "56825f3c41c1befb10ff14f2",
  "56825f9b41c1befb10ff151d",
  "568a302578a749ef5758a6df",
  "568b88ea3aeef845311636ff",
  "568c9bf33aeef84531165f8f",
  "568cd6e53aeef845311671df",
  "568f4b128ca9175f2ba60713",
  "56af3736041ea14c1c9c71ea",
  "56af375d041ea14c1c9c721e",
  "56af37fb041ea14c1c9c72a5",
  "56b3014895dd4c8b7877af72",
  "56b957f6e5b22d0b296a2a68",
  "56bac909ffad86ec524b4915",
  "56bc0f09ffad86ec524bc66b",
  "56bc0f45ffad86ec524bc6db",
  "56bd8ed1abdcbc3c4984165d",
  "56bda559abdcbc3c49842f5d",
  "56c54d84d755d1fe416059a0",
  "56d51d81ce4c8b696fb92805",
  "56d7b4ec850ab6fc2b020a3e",
  "56ea39f02be142cb396fa4b8",
  "56f8eb57554877342c28b6e6",
  "56c58555d755d1fe41607709",
  "56fb4c9b03926f8b342281ef",
  "56fb4ce703926f8b3422826a",
  "56fb4e8f03926f8b342284a0",
  "56fb50991b7a3a8848832eb1",
  "57146c97b97a83eb1fe85fcc",
  "57198ee4d023ea5854302dd2",
  "5714aa817495202518cbb7da",
  "56701fd9972e30ce32624996",
  "5732b08b60e51eac630e0d97",
  "5746d6ba36e3ce026721cacb",
  "574d17cc99343ecf3ff4a367",
  "574e6eb18ee8891b3fd4ae5b",
  "574e6ffb8ee8891b3fd4af23",
  "574e718a8ee8891b3fd4b042",
  "574faf0a6e24d55b6dd280ff",
  "562f1c633bf0310859221f0b",
  "574fe1bd6e24d55b6dd2a7cd",
  "574ff49c6e24d55b6dd2b5c9",
  "575562de8a197f73634d9f4a",
  "5757e5b641a7599a126363a3",
  "5758e9f96449cca92f565b02",
  "5758eb066449cca92f565c22",
  "5758eb366449cca92f565c6c",
  "5758eceb6449cca92f565e31",
  "56b850b0e5b22d0b2969e410",
  "5759008e6449cca92f566a29",
  "575900aa6449cca92f566a56",
  "575901252b52ed47146a10eb",
  "57595056775f28294e43cfc4",
  "57595c89775f28294e43d56a",
  "57595ca9775f28294e43d58b",
  "57595cc0775f28294e43d5a6",
  "57595d1c775f28294e43d5d4",
  "57595d5b775f28294e43d5fc",
  "575a7eebf5d22d4d15e5b073",
  "575a7fa5f5d22d4d15e5b124",
  "575a7ff2f5d22d4d15e5b17b",
  "575fae5879e281147179ab9a",
  "575fd60979e281147179c020",
  "575fd65379e281147179c062",
  "575fd73279e281147179c109",
  "5760c8d6b15bb3803d09c898",
  "57622ee4c5c781f7054b8234",
  "5762324ac5c781f7054b8904",
  "5768ec3a94ffadb54eaf89a9",
  "5768ec3a94ffadb54eaf89c3",
  "576b5a6c3b5781512093e8fa",
  "55e689643510e4ed08f7e977",
  "577385ce440cb77620aea069",
  "5787065abe3beb5566174f21",
  "57870688be3beb5566174f57",
  "578706d1be3beb5566174f93",
  "578706e8be3beb5566174fdd",
  "578707f0be3beb55661750a1",
  "578f1febee94ce0231d9e5e3",
  "5790817bf389d31c0f7f38ba",
  "57908228f389d31c0f7f3927",
  "579083b1f389d31c0f7f39a4",
  "5791831b0ade7d427934f5ee",
  "579edfa173c9df7c19faa985",
  "57bbce425fdd980950a2fa6c",
  "57c6ae4cb0d44c2f2f6500e2",
  "57c7b475b0d44c2f2f65780e",
  "57c85358a9750eb34e8d7541",
  "57d62a80705ccbb81346f0c2",
  "57db7c1047e00c0b7c8ae4dc",
  "57e398e33bec5af64f07b31e",
  "57e8a35b080968d36b70c1e6",
  "561e16a8f13cc0461fc06e12",
  "57f1f79b3b41045008ae7fe6",
  "57f625c805b1ab8449386416",
  "57fb501b24dd7e58055333a3",
  "57fb88578776701c7302bdff",
  "58044fb3cef394c72f483509",
  "5804650e24d13cbb38c7991f",
  "5806f9c94695fc9a42eb7bde",
  "5806fab3323d76a04268d9fb",
  "580872dd1cd7102a1e9cba71",
  "5816deaedddfff4e7538f2aa"
]


const newArray = [
  "54f088efc7a9b9461467c8ea",
  "54f3d4d80055ba9c26e4ea5a",
  "54f3d57d0055ba9c26e4ea5d",
  "54f3df5b0055ba9c26e4ea7e",
  "54f3e2b50055ba9c26e4eac7",
  "54f3e7f30055ba9c26e4eb87",
  "54f42bf60055ba9c26e4ecb4",
  "54f535b65a543d7140d393a6",
  "55c74ba5d42b733721bccc0c",
  "54f831f8b562d314421e83b1",
  "54f833acb562d314421e83d0",
  "54f83952b562d314421e840f",
  "550c0423ea40cb737b8c8063",
  "550c04b2ea40cb737b8c8068",
  "550c051fea40cb737b8c806a",
  "550c0580ea40cb737b8c807c",
  "550c060bea40cb737b8c808d",
  "550d2025ea40cb737b8c80be",
  "550d3f19ea40cb737b8c80df",
  "550e66f4ea40cb737b8c8126",
  "550f8b99ea40cb737b8c812c",
  "550f9631ea40cb737b8c8142",
  "550f967aea40cb737b8c8143",
  "550f986eea40cb737b8c8144",
  "55113a1eea40cb737b8c816c",
  "55139002ea40cb737b8c819b",
  "551408f1ea40cb737b8c81c8",
  "55152b2dea40cb737b8c835d",
  "55152d85ea40cb737b8c836e",
  "551c2a48ea40cb737b8c83e7",
  "5527a42a8cd122d444033cca",
  "552b16ba2d90e1ee5fcf3029",
  "552b4d6c2d90e1ee5fcf3031",
  "552f6cdffc3daca91b3d2df6",
  "5539f9ec90cd11950266d381",
  "553b990990cd11950266d41f",
  "5545214d90cd11950266d47d",
  "5549f1b590cd11950266d48f",
  "5550eed390cd11950266d49e",
  "5551878890cd11950266d4a1",
  "5551961d90cd11950266d4a3",
  "555196ef90cd11950266d4a4",
  "555491a66727676e47e5d83c",
  "5559ba1f6727676e47e5d85b",
  "5559c5206727676e47e5d85e",
  "5566acf50e6f48904125c528",
  "5566c51fb6ede2da4f59ae18",
  "5567cf05870e405f53cdc5a8",
  "556d873c34347e0f4a6c6200",
  "55700dc343e1cfc97d347bc7",
  "557013a543e1cfc97d347bd0",
  "55701e0d10fddb450294f385",
  "5571144d10fddb450294f3da",
  "55750fcd88ea84483a845850",
  "5575230e88ea84483a8458db",
  "557b8fbe916f470645130241",
  "54f09b89c7a9b9461467c8f6",
  "557e6602916f470645130440",
  "557e9f4b844646b31445653f",
  "558280cb9ad30c4669735ed1",
  "55892ca3d6a0f26e275ac5b6",
  "558944b5d6a0f26e275ac5f4",
  "5590d8f3e07653ca477c2202",
  "5594e8e33c82a58e1c02d3e9",
  "5593abc5797dd7c70959a76f",
  "55962bfc48d3d3e246ffa6d9",
  "559632c748d3d3e246ffa759",
  "559638e148d3d3e246ffa792",
  "559e412587ef3bf7132d65fc",
  "55a37b80fcdc35870595e443",
  "55a406aefcdc35870595e63e",
  "5567c927870e405f53cdc5a5",
  "55a66279b9424db226b8d3bc",
  "55a72856db19cfc344860e49",
  "55bcc2661733f14d6cbf4ba3",
  "55be584b1733f14d6cbf4e9b",
  "55beada91733f14d6cbf4ebe",
  "55beb8301733f14d6cbf4ecf",
  "55beec591733f14d6cbf5040",
  "55bef1501733f14d6cbf5073",
  "55bf1f606b19c4d20c518301",
  "55bf2dc1195d94dc0e109c99",
  "55c04b91195d94dc0e10a61d",
  "55c885fd699dc8ef048fe831",
  "55c96149699dc8ef048fe910",
  "55b222bc55f014c6748334b1",
  "55d16e0a8d643e7732892e83",
  "55d1705d8d643e7732892eff",
  "55d171478d643e7732892f1f",
  "55d59e755f1119616d55183f",
  "55d5e02d5f1119616d551c8b",
  "55d68bdc5f1119616d551d62",
  "55966e0c48d3d3e246ffa891",
  "5594ea0b3c82a58e1c02d3fd",
  "55dbda6eda7045ae3263cd64",
  "55dbdc22da7045ae3263cd6e",
  "55de98328dcf5de6631b4d98",
  "55deeb4cb1cdccc366ac92c4",
  "55e5432c2358b8bf1d54ad7a",
  "55ac9ebe424136a502b59dd6",
  "55c037e2195d94dc0e10a416",
  "55e92090602bc21918a29f7e",
  "55f001e6d697fd846e0ea9d2",
  "55f68662446501445f97d79c",
  "55f7f194b971644d7d86001f",
  "55f937e60c3bc5b85e1897a5",
  "55f8f041b971644d7d861502",
  "55fa53c134fb7538797d5080",
  "55fa53c134fb7538797d509a",
  "5602347ac868446663e67d8e",
  "5612140b5e44e0634efab8f1",
  "5614d74b5988e00f11db53dc",
  "561b382c18d0a2c74d9c7184",
  "5630a8023bf03108592266f7",
  "5630a8663bf0310859226746",
  "55e6db5ba856461404a5f3f0",
  "5630a8b43bf0310859226790",
  "5630a8e53bf03108592267c0",
  "5630a98b3bf0310859226883",
  "5630a9a53bf03108592268b8",
  "5630aa493bf0310859226904",
  "5631e4b33bf0310859229a3e",
  "55e59ec2b68cdc1411955142",
  "563700b452f4b32b5137e643",
  "56370ce352f4b32b5137e962",
  "5637257652f4b32b5137f0df",
  "563731c852f4b32b5137f46f",
  "563831c925c42f3b78494373",
  "563838f325c42f3b784946c7",
  "563707c752f4b32b5137e7fa",
  "5604124e0083297b6b4dc14c",
  "56401e08d6f47ae719be997e",
  "563843a625c42f3b78494b3f",
  "5652900f9f47780e5b5e3228",
  "560a6d74b534c68f2eb62308",
  "567baafc7a49015411a657fd",
  "56668d718d28560e770e685f",
  "56825f3c41c1befb10ff14f2",
  "56825f9b41c1befb10ff151d",
  "568a302578a749ef5758a6df",
  "568b88ea3aeef845311636ff",
  "568c9bf33aeef84531165f8f",
  "568cd6e53aeef845311671df",
  "568f4b128ca9175f2ba60713",
  "56af3736041ea14c1c9c71ea",
  "56af375d041ea14c1c9c721e",
  "56af37fb041ea14c1c9c72a5",
  "56b3014895dd4c8b7877af72",
  "56b957f6e5b22d0b296a2a68",
  "56bac909ffad86ec524b4915",
  "56bc0f09ffad86ec524bc66b",
  "56bc0f45ffad86ec524bc6db",
  "56bd8ed1abdcbc3c4984165d",
  "56bda559abdcbc3c49842f5d",
  "56c54d84d755d1fe416059a0",
  "56d51d81ce4c8b696fb92805",
  "56d7b4ec850ab6fc2b020a3e",
  "56ea39f02be142cb396fa4b8",
  "56f8eb57554877342c28b6e6",
  "56c58555d755d1fe41607709",
  "56fb4c9b03926f8b342281ef",
  "56fb4ce703926f8b3422826a",
  "56fb4e8f03926f8b342284a0",
  "56fb50991b7a3a8848832eb1",
  "57146c97b97a83eb1fe85fcc",
  "57198ee4d023ea5854302dd2",
  "5714aa817495202518cbb7da",
  "56701fd9972e30ce32624996",
  "5732b08b60e51eac630e0d97",
  "5746d6ba36e3ce026721cacb",
  "574d17cc99343ecf3ff4a367",
  "574e6eb18ee8891b3fd4ae5b",
  "574e6ffb8ee8891b3fd4af23",
  "574e718a8ee8891b3fd4b042",
  "574faf0a6e24d55b6dd280ff",
  "562f1c633bf0310859221f0b",
  "574fe1bd6e24d55b6dd2a7cd",
  "574ff49c6e24d55b6dd2b5c9",
  "575562de8a197f73634d9f4a",
  "5757e5b641a7599a126363a3",
  "5758e9f96449cca92f565b02",
  "5758eb066449cca92f565c22",
  "5758eb366449cca92f565c6c",
  "5758eceb6449cca92f565e31",
  "56b850b0e5b22d0b2969e410",
  "5759008e6449cca92f566a29",
  "575900aa6449cca92f566a56",
  "575901252b52ed47146a10eb",
  "57595056775f28294e43cfc4",
  "57595c89775f28294e43d56a",
  "57595ca9775f28294e43d58b",
  "57595cc0775f28294e43d5a6",
  "57595d1c775f28294e43d5d4",
  "57595d5b775f28294e43d5fc",
  "575a7eebf5d22d4d15e5b073",
  "575a7fa5f5d22d4d15e5b124",
  "575a7ff2f5d22d4d15e5b17b",
  "575fae5879e281147179ab9a",
  "575fd60979e281147179c020",
  "575fd65379e281147179c062",
  "575fd73279e281147179c109",
  "5760c8d6b15bb3803d09c898",
  "57622ee4c5c781f7054b8234",
  "5762324ac5c781f7054b8904",
  "5768ec3a94ffadb54eaf89a9",
  "5768ec3a94ffadb54eaf89c3",
  "576b5a6c3b5781512093e8fa",
  "55e689643510e4ed08f7e977",
  "577385ce440cb77620aea069",
  "5787065abe3beb5566174f21",
  "57870688be3beb5566174f57",
  "578706d1be3beb5566174f93",
  "578706e8be3beb5566174fdd",
  "578707f0be3beb55661750a1",
  "578f1febee94ce0231d9e5e3",
  "5790817bf389d31c0f7f38ba",
  "57908228f389d31c0f7f3927",
  "579083b1f389d31c0f7f39a4",
  "5791831b0ade7d427934f5ee",
  "579edfa173c9df7c19faa985",
  "57bbce425fdd980950a2fa6c",
  "57c6ae4cb0d44c2f2f6500e2",
  "57c7b475b0d44c2f2f65780e",
  "57c85358a9750eb34e8d7541",
  "57d62a80705ccbb81346f0c2",
  "57db7c1047e00c0b7c8ae4dc",
  "57e398e33bec5af64f07b31e",
  "57e8a35b080968d36b70c1e6",
  "561e16a8f13cc0461fc06e12",
  "57f1f79b3b41045008ae7fe6",
  "57f625c805b1ab8449386416",
  "57fb501b24dd7e58055333a3",
  "57fb88578776701c7302bdff",
  "58044fb3cef394c72f483509",
  "5804650e24d13cbb38c7991f",
  "5806f9c94695fc9a42eb7bde",
  "5806fab3323d76a04268d9fb",
  "580872dd1cd7102a1e9cba71",
  "5816deaedddfff4e7538f2aa"
]

module.exports = {
  oldArray,
  newArray
}
