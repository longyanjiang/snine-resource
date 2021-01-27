/**,
 * @swagger
 * /api/user/test:
 *    get:
 *      tags:
 *      - sunny
 *      summary: demo
 *      description: 这是一个demo描述的接口，教会你怎么配置这段注释参数
 *      operationId: test1
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: current
 *        in: query
 *        description:
 *        required: false
 *        type: integer
 *        maximum:
 *        minimum: 1
 *        format:
 *      - name: size
 *        in: query
 *        description:
 *        required: false
 *        type: integer
 *        maximum:
 *        minimum: 1
 *        format:
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */