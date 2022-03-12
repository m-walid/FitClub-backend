import CoachDto from '@/dtos/coachDto';
import { cleanDb, mockCoachAccount, mockExercise, mockTraineeAccount } from './helpers/testDbHelpers';
import request from 'supertest';
import app from '@/app';
import CreateCoachReview from '@/dtos/createCoachReview';
import UpdateCoachReview from '@/dtos/updateCoachReview';
const coachUrl = '/api/v1/coaches/';

let account;
let token;
beforeAll(async () => {
  const resp = await mockCoachAccount(true);
  account = resp.account;
  token = resp.token;
});
afterAll(async () => {
  await cleanDb();
});
describe('api/v1/coaches endpoints (coach controller)', () => {
  describe('[POST] create coach profile', () => {
    it('sucessfully create coach profile', async () => {
      const coachDto: CoachDto = {
        bio: 'test coach bio lorem ',
        accountId: '',
      };
      const response = await request(app).post(coachUrl).set('Authorization', token).send(coachDto).expect(200);
      expect(response.body.data).toBeDefined();
    });
  });
  describe('[GET] get coach profile', () => {
    it('sucessfully get coach profile', async () => {
      const response = await request(app)
        .get(coachUrl + '/' + account.id)
        .set('Authorization', token)
        .expect(200);
      expect(response.body.data).toBeDefined();
    });
  });
  describe('[PATCH] update coach profile', () => {
    it('sucessfully update coach profile', async () => {
      const coachDto: CoachDto = {
        bio: 'updated test coach bio lorem ',
        accountId: '',
      };
      const response = await request(app)
        .patch(coachUrl + '/' + account.id)
        .set('Authorization', token)
        .send(coachDto)
        .expect(200);
      expect(response.body.data).toBeDefined();
    });
  });
  describe('coach reviews', () => {
    let traineeToken;
    let reviewId;
    beforeAll(async () => {
      const resp = await mockTraineeAccount(true);
      traineeToken = resp.token;
    });
    describe('[POST] create coach review', () => {
      it('successfully add coach review', async () => {
        const coachReviewDto: CreateCoachReview = {
          description: 'lorem sadkljferijflksf',
          rating: 5,
          coachId: '',
          userId: '',
        };
        const response = await request(app)
          .post(`${coachUrl}${account.id}/reviews`)
          .set('Authorization', traineeToken)
          .send(coachReviewDto)
          .expect(200);
        expect(response.body.data).toBeDefined();
        reviewId = response.body.data.id;
      });
    });
    describe('[GET] get coach reviews', () => {
      it('successfully get all coach reviews', async () => {
        const response = await request(app).get(`${coachUrl}${account.id}/reviews`).set('Authorization', traineeToken).expect(200);
        expect(response.body.data).toBeDefined();
      });
    });
    describe('[PATCH] update a coach review', () => {
      it('successfully update a coach review', async () => {
        const updateCoachReview: UpdateCoachReview = {
          description: 'lorem sadkljferijflksf',
          rating: 3,
        };

        const response = await request(app)
          .patch(`${coachUrl}reviews/${reviewId}`)
          .set('Authorization', traineeToken)
          .send(updateCoachReview)
          .expect(200);
        expect(response.body.data.rating).toEqual(3);
      });
    });
    describe('[DELETE] delete a coach review', () => {
      it('successfully delete a coach review', async () => {
        await request(app).delete(`${coachUrl}reviews/${reviewId}`).set('Authorization', traineeToken).expect(200);
      });
    });
  });

  describe('[GET] get coach exercises', () => {
    beforeAll(async () => {
      await mockExercise(account.id);
    });
    it('sucessfully get coach exercises', async () => {
      await request(app).get(`${coachUrl}${account.id}/exercises`).set('Authorization', token).expect(200);
    });
  });
});
