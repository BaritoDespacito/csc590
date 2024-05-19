using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PointOrb : MonoBehaviour
{
    
    public GameObject Player;
    [SerializeField] int MoveSpeed = 4;
    [SerializeField] int MaxDist = 10;
    [SerializeField] int MinDist = 5;
    
    // Start is called before the first frame update
    void Start()
    {
        Player = GameObject.FindGameObjectWithTag("Player");
    }

    // Update is called once per frame
    void Update()
    {
        transform.LookAt(Player.transform);

        if (Vector3.Distance(transform.position, Player.transform.position) < MinDist)
        {
            transform.position += transform.forward * MoveSpeed * Time.deltaTime;
        }
    }
}
