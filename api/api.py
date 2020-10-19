import time
from flask import Flask
from pulp import *
import pandas as pd
import numpy as np
app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': "hello"}


@app.route('/knapsack/<budget>', methods=['GET'])
def knapsack(budget):
    data=pd.read_excel('./players.xlsx', index_col=0,header=0)
    data.reset_index(level=0, inplace=True)
    player = [str(i) for i in range(data.shape[0])]
    point = {str(i): data['points'][i] for i in range(data.shape[0])} 
    cost = {str(i): data['cost'][i] for i in range(data.shape[0])}
    gk = {str(i): 1 if data['position'][i] == 'Goalkeeper' else 0 for i in range(data.shape[0])}
    defe = {str(i): 1 if data['position'][i] == 'Defender' else 0 for i in range(data.shape[0])}
    mid = {str(i): 1 if data['position'][i] == 'Midfielder' else 0 for i in range(data.shape[0])}
    attck = {str(i): 1 if data['position'][i] == 'Attacker' else 0 for i in range(data.shape[0])}
    xi = {str(i): 1 for i in range(data.shape[0])}

    prob = LpProblem("Fantasy Football",LpMaximize)
    player_vars = LpVariable.dicts("Players",player,0,1,LpBinary)

    prob += lpSum([point[i]*player_vars[i] for i in player]), "Total Cost"

    # constraint
    prob += lpSum([player_vars[i] for i in player]) == 11, "Total 11 Players"
    prob += lpSum([cost[i] * player_vars[i] for i in player]) <= float(budget), "Total Cost"
    prob += lpSum([gk[i] * player_vars[i] for i in player]) == 1, "Only 1 GK"
    prob += lpSum([defe[i] * player_vars[i] for i in player]) <= 4, "Less than 4 DEF"
    prob += lpSum([mid[i] * player_vars[i] for i in player]) <= 5, "Less than 5 MID"
    prob += lpSum([attck[i] * player_vars[i] for i in player]) <= 3, "Less than 3 ATTCK"

    status = prob.solve()
    print("Status:", LpStatus[prob.status])

    selection = {}
    for v in prob.variables():
        index = int(v.name.split("_")[1])
        selection[index] = v.varValue

    data['selected'] = 0.0
    for i in selection:
        data.loc[i, 'selected'] = selection[i]
    
    XI = data[data['selected'] == 1.0]
  

    return  XI.to_dict()