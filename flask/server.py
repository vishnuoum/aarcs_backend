from flask import Flask, render_template,request,jsonify
import json
import joblib


app = Flask(__name__)

model=joblib.load("model/model.pkl")


@app.route('/recommend', methods=['POST','GET'])
def recommend():
    if request.method=="GET":
        print(request.args)
        N=request.args.get('N')
        P=request.args.get('P')
        K=request.args.get('K')
        temperature=request.args.get('temperature')
        humidity=request.args.get('humidity')
        ph=request.args.get('ph')
        rainfall=request.args.get('rainfall')
        result=model.predict([[N,P,K,temperature,humidity,ph,rainfall]])
        print(result[0])
        return result[0]
    else:
        return "No Authorization"






if __name__ == '__main__':
    app.run(port="3001")