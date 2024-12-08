export interface Plant {
  id: string;
  name: string; // 식물명
  scientificName: string; // 학명
  description: string; // 설명
  height: string; // 수고
  width: string; // 수폭
  leafColor: string; // 잎색
  flowerColor: string; // 꽃색
  bloomingSeason: string; // 개화기
  managementLevel: string; // 관리수준
  growthRate: string; // 생장속도
  lightRequirement: string; // 광요구도
  waterRequirement: string; // 물요구도
  imageUrl?: string; // 이미지 URL
}
