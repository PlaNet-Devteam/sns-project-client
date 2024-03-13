export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  NO_ANSWER = 'NO_ANSWER',
}

export const CONST_GENDER = Object.values(GENDER);

export const genderTransformer = (value: GENDER) => {
  switch (value) {
    case GENDER.MALE:
      return '남성';
    case GENDER.FEMALE:
      return '여성';
    case GENDER.OTHER:
      return ' 기타';
    case GENDER.NO_ANSWER:
      return '미정';
    default:
      return '';
  }
};
